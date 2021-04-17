const comicsCardLayout = document.querySelector(".cards-layout");
const form = document.querySelector("form");
const submitButton = document.querySelector("#form-submit-button");
const typeFilter = document.querySelector("#type");
const orderFilter = document.querySelector("#order");
const characterCardLayout = document.querySelector(".character-layout");
const resultsPerPage = document.querySelector(".results-number");
let totalOfData = "";

// ------------------------- Beginning of Search
const searchInput = document.querySelector("#search-input");

// deberiamos retornar explicitamente un false,
// no dejar que se retorne undefined en caso negativo
// Podriamos mejorar el codigo asi:
// const thereIsSearch = () => {
//   return Boolean(searchInput.value)
// };
// que retorna true si el string tiene contenido, y false en caso contrario
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
const displayingContent = (typeOfContent, typeOfOrder, offset) => {
  // alternativa: offset = String(offset)
  offset == undefined ? (offset = "") : offset;
  fetch(
    `https://gateway.marvel.com:443/v1/public/${typeOfContent}?${searchURL(
      typeOfOrder
    )}orderBy=${typeOfOrder}&apikey=5b28d7dfab933cb0faf686ed9e76a30a${offset}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      cardsGenerator(info);
      // no dejes console log en entregas!
      console.log(info);
      totalOfData = info.data.total;
    });
};

displayingContent("comics", "title", "");
// ----------------------  End of Cards Generations
const getArticleInfo = (typeOfArticle, article) => {
  article.forEach((art) => {
    art.onclick = () => {
      resetCardSection();
      let articleId = art.dataset.id;
      displayingArticleInfo(typeOfArticle, articleId);
      generateThumbnails();
    };
  });
};

const displayingArticleInfo = (typeOfArticle, articleId) => {
  console.log("Artcie")
  fetch(
    `https://gateway.marvel.com:443/v1/public/${typeOfArticle}/${articleId}?apikey=5b28d7dfab933cb0faf686ed9e76a30a`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      console.log(info.data)
      console.log(typeOfArticle)
      info.data.results.map((content) => {
        // esta logica es muy poco clara
        // si typeOfArticle es comic, ejecuto getUriCollectionChars, 
        // si no, ejecuto getUriCollectionComics
        // Despues nos fijamos si typeOfArticle es characters, si lo es ejecutamos 
        // characterIndivualDisplay, si no comicIndivualDisplay
        // no podemos unir ambas cosas en un solo condicional? 
        // por que chequeamos dos veces typeOfArticle?
        typeOfArticle == "comics"
          ? getUriCollectionChars(content)
          : getUriCollectionComics(content);

        typeOfArticle == "characters"
          ? characterIndivualDisplay(content)
          : comicIndivualDisplay(content);
      });
    });
};
const getUriCollectionComics = (comic) => {
  let comicId = comic.comics.items;
// aca estamos haciendo un map sobre comics.items, por que no usamos
// comics.collectionURI que tiene toda esta info? por cada personaje estas
// haciendo 10 o 20 fetch, uno por cada comic!
  comicId.map((comic) => {
    let sourceOfComic = comic.resourceURI;
    displayingListOfArticles(sourceOfComic);
  });
};

const getUriCreators = (content) => {
  displayingListOfArticles(content.creators.collectionURI);
};

const getUriCollectionChars = (content) => {
  displayingListOfArticles(content.characters.collectionURI);
};

// este nombre se puede mejorar, no es claro lo que hace esta funcion
const displayingListOfArticles = (content) => {
  console.log(content)
  fetch(`${content}?apikey=5b28d7dfab933cb0faf686ed9e76a30a`)
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      console.log(info.data.results)
      info.data.results.map((info) => {
        if (content.includes("creators")) {
          displayingCreatorsInfo(info);
        } else if (content.includes("characters")) {
          cardCharacterContent(info);
          getInfoChar();
        } else {
          cardComicContent(info);
          getInfoComic();
        }
      });
    });
};

const displayingCreatorsInfo = (info) => {
  const fullName = info.firstName + " " + info.lastName;
  const creatorsInfo = document.querySelector(".creators-info");
  creatorsInfo.innerHTML = `${fullName}`;
};

// --------------------------Beginning of Cards Generator for Comics
const cardsGenerator = (info) => {
  comicsCardLayout.innerHTML = "";
  resultsPerPage.innerHTML = info.data.results.length;
  if (checkingFilterType() === "comics") {
    info.data.results.map((content) => {
      cardComicContent(content);
      getInfoComic();
    });
  } else {
    info.data.results.map((content) => {
      cardCharacterContent(content);

      getInfoChar();
    });
  }
};

const getInfoComic = () => {
  const comics = document.querySelectorAll(".comic-article");

  getArticleInfo("comics", comics);
  generateThumbnails();
};
const getInfoChar = () => {
  const characters = document.querySelectorAll(".character-article");

  getArticleInfo("characters", characters);
  generateThumbnails();
};

const generateThumbnails = () => {
  const thumbnails = document.querySelectorAll(".comic-thumbnail");
  const charThumbnails = document.querySelectorAll(".char-thumbnail");

  charThumbnails.forEach((content) => {
    if (
      // alternativa: 
      // content.src.contains("image_not_available")
      content.src ==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      content.src = "img/notfound.png";
    }
  });

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
  // dejamos el alt vacio solo para imagenes decorativas
  // aqui debe tener el nombre del comic
  return (comicsCardLayout.innerHTML += `<article class="comic-article"  data-id="${
    content.id
  }"> 
  <img class="comic-thumbnail" src="${content.thumbnail.path}.${
    content.thumbnail.extension
  }" alt="">
  <p class="comic-title">${content.title ? content.title : content.name}</p>
</article>`);
};

const cardCharacterContent = (character) => {
  return (comicsCardLayout.innerHTML += `  <article class="character-article" data-id="${character.id}">
  <img class="char-thumbnail" src="${character.thumbnail.path}.${character.thumbnail.extension}"
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

const checkingTypeOfContent = (offset) => {
  if (typeFilter.value === "comic") {
    orderBy("comics", "title", offset);
  } else {
    orderBy("characters", "name", offset);
  }
};

const orderBy = (type, order, offset) => {
  if (orderFilter.value === "az") {
    displayingContent(type, order, offset);
  } else if (orderFilter.value === "za") {
    displayingContent(type, `-${order}`, offset);
  } else if (orderFilter.value === "older") {
    displayingContent(type, "-focDate", offset);
  } else if (orderFilter.value === "newer") {
    displayingContent(type, "focDate", offset);
  }
};

//-------------💥Beginning of Character Displayed

const characterIndivualDisplay = (char) => {
  resultsPerPage.innerHTML = char.comics.items.length;
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
  resultsPerPage.innerHTML = comic.characters.items.length;
  let fullName = "";

  getUriCreators(comic);

  comicsCardLayout.innerHTML = "";
  characterCardLayout.innerHTML += `   
  <article class="article-content">
      <img class="article-thumbnail" src="${comic.thumbnail.path}.${
    comic.thumbnail.extension
  }"
          alt="${comic.title}">
      <div class="detail-info">
          <h2>${comic.title}</h2>
          <h3>Publicado</h3>
          <p>${getComicDate(comic)}</p>
          <h3>Guionistas</h3>

          <p class="creators-info">${fullName}</p>
          <h3>Descripción</h3>
          <p>${
            comic.description == null
              ? "Descripción no disponible"
              : comic.description
          }</p>
      </div>
  </article>`;
};
//-------------💥End of ComicDisplayed

const getComicDate = (info) => {
  let newDate = "";
  info.dates.map((content) => {
    if (content.type == "focDate") {
      newDate = new Date(content.date);
      newDate = newDate.toLocaleDateString();
    }
  });
  return newDate;
};
//-------------💥Reset the cards section

const resetCardSection = () => {
  comicsCardLayout.innerHTML = "";
  characterCardLayout.innerHTML = "";
};

//-------------💥Beginning of Pagination
let actualPage = 0;
let resultsPerPagePagination = 20;
const firstPage = document.querySelector(".first-page");
const previousPage = document.querySelector(".previous-page");
const nextPage = document.querySelector(".next-page");
const lastPage = document.querySelector(".last-page");
let offset = 0;
let offsetUpdate = actualPage * resultsPerPagePagination;
let actualOffset = `&offset=${offsetUpdate}`;
let finalPage = false;

const disableButtons = () => {
  actualPage == 0
    ? ((previousPage.disabled = true),
    // aqui firstPage deberia estar disabled
      (previousPage.className = "previous-page hidden"))
    : ((previousPage.disabled = false),
      (previousPage.className = "previous-page"),
      (firstPage.disabled = false),
      (firstPage.className = "first-page"));

  finalPage == true
    ? ((nextPage.disabled = true),
      (nextPage.className = "next-page hidden"),
      (firstPage.disable = false),
      (firstPage.className = "first-page"),
      (previousPage.className = "previous-page"),
      (previousPage.disabled = false))
    : ((nextPage.disabled = false), (nextPage.className = "next-page"));
};
disableButtons();

nextPage.onclick = () => {
  finalPage = false;
  actualPage = offsetUpdate + resultsPerPagePagination;
  offsetUpdate = actualPage;
  actualOffset = `&offset=${offsetUpdate}`;
  resetCardSection();
  searchURL();
  checkingTypeOfContent(actualOffset);
  disableButtons();
};

firstPage.onclick = () => {
  displayingContent("comics", "title", "");
  disableButtons();
};

previousPage.onclick = () => {
  finalPage = false;
  actualPage = offsetUpdate - resultsPerPagePagination;
  offsetUpdate = actualPage;
  actualOffset = `&offset=${offsetUpdate}`;
  resetCardSection();
  searchURL();
  checkingTypeOfContent(actualOffset);
  disableButtons();
};

lastPage.onclick = () => {
  let totalOfPages = totalOfData / resultsPerPagePagination;
  let decimal = totalOfPages - Math.floor(totalOfPages);
  let activePages = totalOfPages - decimal;

  decimal > 0
    ? (offsetUpdate = activePages * resultsPerPagePagination + 1)
    : (offsetUpdate = activePages * resultsPerPagePagination);

  finalPage = true;
  actualPage = offsetUpdate;

  actualOffset = `&offset=${offsetUpdate}`;
  resetCardSection();
  searchURL();
  checkingTypeOfContent(actualOffset);
  disableButtons();
};
