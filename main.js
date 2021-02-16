const cardsLayout = document.querySelector(".cards-layout");
const form = document.querySelector("form");
const submitButton = document.querySelector("#form-submit-button");
const typeFilter = document.querySelector("#type");
const orderFilter = document.querySelector("#order");

// ------------------------- Beginning of Search
const searchInput = document.querySelector("#search-input");

const SearchIsOn = () => {
  if (searchInput.value) {
    return true;
  }
};

const searchURL = (typeOfOrder) => {
  if (SearchIsOn()) {
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
      cardsGeneratorComics(info);
      console.log(info);
      // if (checkingFilterType() === "comics") {
      //   cardsGeneratorComics(info);
      // } else {
      //   cardsGeneratorsCharacters(info);
      // }
    });
};
displayingContent("comics", "title");
// ----------------------  End of Cards Generations

// --------------------------Beginning of Cards Generator for Comics
const cardsGeneratorComics = (info) => {
  cardsLayout.innerHTML = "";
  info.data.results.map((comic) => {
    cardsLayout.innerHTML += `<article class="comic-article"> 
      <img class="comic-thumbnail" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="">
      <p class="comic-title">${comic.title}</p>
  </article>`;
  });
  const thumbnails = document.querySelectorAll(".comic-thumbnail");

  thumbnails.forEach((comic) => {
    if (
      comic.src ==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      comic.src = "img/notfound.png";
    }
  });
};

// ------------------------- End of Cards Generator for Comics

// ------------------ Beginning of Filters
form.onsubmit = (e) => {
  e.preventDefault();
  submitButton.onclick = () => {
    checkingFilterType();
  };
};

const checkingFilterType = () => {
  if (typeFilter.value === "comic") {
    orderBy("comics", "title");
    return "comics";
  } else {
    orderBy("characters", "name");
    return "characters";
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
