const comicsCardLayout = document.querySelector(".cards-layout");
const form = document.querySelector("form");
const submitButton = document.querySelector("#form-submit-button");
const typeFilter = document.querySelector("#type");
const orderFilter = document.querySelector("#order");
const characterCardLayout = document.querySelector(".character-layout");

// ------------------------- Beginning of Search
const searchInput = document.querySelector("#search-input");

const thereIsSearch = () => {
  if (searchInput.value) {
    return true;
  }
};

const searchURL = (typeOfOrder) => {
  if (thereIsSearch()) {
    const searchValue = searchInput.value.toLowerCase();
    return `${typeOfOrder}StartsWith=${searchValue}&`;
  } else {
    return "";
  }
};
// ------------------------- End of Search

// ---------------------- Beginning of Cards Generations
const displayingContent = (typeOfContent, typeOfOrder, searchInput) => {
  // https://gateway.marvel.com:443/v1/public/characters?orderBy=name&apikey=
  // https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spi&orderBy=name&apikey=
  // https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=spider&orderBy=title&apikey=

  // characters/comics = typeOfContent
  // name/title = typeOfOrder
  // StartsWith = searchOrder (si hay busqueda sino null)
  // searchInput = spider
  // orderBy = typeOfOrder

  // si hay busqueda este fech

  fetch(
    `https://gateway.marvel.com:443/v1/public/${typeOfContent}?${searchURL(
      typeOfOrder
    )}orderBy=${typeOfOrder}&apikey=5b28d7dfab933cb0faf686ed9e76a30a`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      cardsGenerator(info);
    });
};

displayingContent("comics", "title");
// ----------------------  End of Cards Generations
const getArticleInfo = (typeOfArticle, article) => {
  article.forEach((art) => {
    art.onclick = () => {
      let articleId = art.dataset.id;
      displayingArticleInfo(typeOfArticle, articleId);
    };
  });
};
// for the displayingArticleInfo
const checkingTypeOfArticle = (typeOfArticle, info) => {
  if (typeOfArticle === "comics") {
    comicIndivualDisplay(info);
  } else if (typeOfArticle === "characters") {
    characterIndivualDisplay(info);
  }
};

const gettingExtraInfoComics = (info) => {
  info.dates.map((content) => {
    getTheDate(content);
  });
};

const getTheDate = (content) => {
  let newDate = new Date(content.date);
  newDate = newDate.toLocaleDateString();
};

const displayingArticleInfo = (typeOfArticle, articleId) => {
  fetch(
    `https://gateway.marvel.com:443/v1/public/${typeOfArticle}/${articleId}?apikey=5b28d7dfab933cb0faf686ed9e76a30a`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      info.data.results.map((info) => {
        // characterIndivualDisplay(info);
        checkingTypeOfArticle(typeOfArticle, info);
        // comicIndivualDisplay
      });
      info.data.results.map((content) => {
        typeOfArticle == "comics"
          ? getUriCollectionChars(content)
          : getUriCollectionComics(content);

        // console.log("uri", content.characters.collectionURI);
        // aca diferenciar comic de character y traer el uri del character.

        // console.log("content", content);
      });
    });
};
const getUriCollectionComics = (comic) => {
  let comicId = comic.comics.items;
  comicId.map((comic) => {
    let sourceOfComic = comic.resourceURI;
    console.log(sourceOfComic);
    displayingListOfArticles(sourceOfComic);
  });
};

const getUriCollectionChars = (content) => {
  displayingListOfArticles(content.characters.collectionURI);
};

const displayingListOfArticles = (content) => {
  fetch(`${content}?apikey=5b28d7dfab933cb0faf686ed9e76a30a`)
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      info.data.results.map((info) => {
        cardComicContent(info);
      });
    });
};

// --------------------------Beginning of Cards Generator for Comics
const cardsGenerator = (info) => {
  comicsCardLayout.innerHTML = "";
  if (checkingFilterType() === "comics") {
    info.data.results.map((content) => {
      cardComicContent(content);
    });
    const comics = document.querySelectorAll(".comic-article");
    getArticleInfo("comics", comics);
  } else {
    info.data.results.map((content) => {
      cardCharacterContent(content);
    });

    const characters = document.querySelectorAll(".character-article");
    getArticleInfo("characters", characters);
    generateThumbnails();
  }
};

const generateThumbnails = () => {
  const thumbnails = document.querySelectorAll(".comic-thumbnail");

  thumbnails.forEach((content) => {
    if (
      content.src ==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      content.src = "img/notfound.png";
    }
  });
};
// ------------------------- End of Cards Generator for Comics

const cardComicContent = (content) => {
  return (comicsCardLayout.innerHTML += `<article class="comic-article"  data-id="${content.id}"> 
  <img class="comic-thumbnail" src="${content.thumbnail.path}.${content.thumbnail.extension}" alt="">
  <p class="comic-title">${content.title}</p>
</article>`);
};

const cardCharacterContent = (character) => {
  return (comicsCardLayout.innerHTML += `  <article class="character-article" data-id="${character.id}">
  <img class="comic-thumbnail" src="${character.thumbnail.path}.${character.thumbnail.extension}"
      alt="">
  <div class="background-char-title">
      <p class="character-title">${character.name}</p>
  </div>
</article>`);
};

// ------------------ Beginning of Filters
form.onsubmit = (e) => {
  e.preventDefault();
  submitButton.onclick = () => {
    resetCardSection();
    searchURL();
    checkingTypeOfContent();
  };
};

const checkingFilterType = () => {
  if (typeFilter.value === "comic") {
    return "comics";
  } else {
    return "characters";
  }
};

const checkingTypeOfContent = () => {
  if (typeFilter.value === "comic") {
    orderBy("comics", "title");
  } else {
    orderBy("characters", "name");
  }
};

const orderBy = (type, order) => {
  if (orderFilter.value === "az") {
    displayingContent(type, order);
  } else if (orderFilter.value === "za") {
    displayingContent(type, `-${order}`);
  } else if (orderFilter.value === "older") {
    displayingContent(type, "-focDate");
  } else if (orderFilter.value === "newer") {
    displayingContent(type, "focDate");
  }
};

//-------------💥Beginning of Character Displayed

const characterIndivualDisplay = (char) => {
  comicsCardLayout.innerHTML = "";
  characterCardLayout.innerHTML += `   
  <article class="char-content">
      <img class="character-thumbnail" src="${char.thumbnail.path}.${char.thumbnail.extension}"
          alt="${char.name}">
      <div>
          <h2>${char.name}</h2>
          <p>${char.description}</p>
      </div>
  </article>`;
};

//-------------💥End of Character Displayed

//-------------💥Beginning of Comic Displayed
const comicIndivualDisplay = (comic) => {
  // gettingExtraInfoComics(comic);
  comicsCardLayout.innerHTML = "";
  characterCardLayout.innerHTML += `   
  <article class="article-content">
      <img class="article-thumbnail" src="${comic.thumbnail.path}.${comic.thumbnail.extension}"
          alt="${comic.title}">
      <div>
          <h2>${comic.title}</h2>
          <h3>Publicado</h3>
          <p>${comic.dates}</p>
          <h3>Guionistas</h3>
          <p>${comic.creators.items}</p>
          <h3>Descripción</h3>
          <p>${comic.description}</p>
      </div>
  </article>`;
};
//-------------💥End of ComicDisplayed

//-------------💥Reset the cards section

const resetCardSection = () => {
  comicsCardLayout.innerHTML = "";
  characterCardLayout.innerHTML = "";
};

// const replaceEmptyTitle = () => {
//   const characterName = document.querySelector(".char-name");
//   console.log(characterName);
//   if (characterName.textContent === "undefined") {
//     characterName.textContent = "Sin Nombre";
//   }
// };
