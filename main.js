const cardsLayout = document.querySelector(".cards-layout");
const form = document.querySelector("form");
const submitButton = document.querySelector("#form-submit-button");
const typeFilter = document.querySelector("#type");
const orderFilter = document.querySelector("#order");

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
      // console.log(cardsGenerator(info));
      cardsGenerator(info);
    });
};
// console.log(displayingContent("comics", "title"));
displayingContent("comics", "title");
// ----------------------  End of Cards Generations

// --------------------------Beginning of Cards Generator for Comics
const cardsGenerator = (info) => {
  cardsLayout.innerHTML = "";
  if (checkingFilterType() === "comics") {
    info.data.results.map((content) => {
      cardComicContent(content);
    });
  } else {
    info.data.results.map((content) => {
      cardCharacterContent(content);
    });

    const thumbnails = document.querySelectorAll(".comic-thumbnail");

    thumbnails.forEach((content) => {
      if (
        content.src ==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        content.src = "img/notfound.png";
      }
    });
  }
};

// ------------------------- End of Cards Generator for Comics

const cardComicContent = (content) => {
  return (cardsLayout.innerHTML += `<article class="comic-article"> 
  <img class="comic-thumbnail" src="${content.thumbnail.path}.${content.thumbnail.extension}" alt="">
  <p class="comic-title">${content.title}</p>
</article>`);
};

const cardCharacterContent = (character) => {
  return (cardsLayout.innerHTML += `  <article class="character-article">
  <img class="comic-thumbnail" src="${character.thumbnail.path}.${character.thumbnail.extension}"
      alt="">
  <div class="">
      <p class="character-title">${character.name}</p>
  </div>
</article>`);
};

// ------------------ Beginning of Filters
form.onsubmit = (e) => {
  e.preventDefault();
  submitButton.onclick = () => {
    thereIsSearch();
    checkingFilterType();
  };
};

const checkingFilterType = () => {
  if (typeFilter.value === "comic") {
    // orderBy("comics", "title");
    return "comics";
  } else {
    orderBy("characters", "name");
    // return "characters";
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
