const cardsLayout = document.querySelector(".cards-layout");
// ---------------------- Beginning of Cards Generations
fetch(
  "https://gateway.marvel.com/v1/public/comics?apikey=5b28d7dfab933cb0faf686ed9e76a30a"
)
  .then((res) => {
    return res.json();
  })
  .then((info) => {
    cardsGenerator(info);
  });
// ----------------------  End of Cards Generations

// ------------------------- Beginning of Search
const searchInput = document.querySelector("#search-input");

console.log(searchInput);

const onSearch = () => {
  searchInput.oninput = () => {
    const searchValue = searchInput.value.toLowerCase();
    // console.log(searchValue);
    fetch(
      `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchValue}&apikey=5b28d7dfab933cb0faf686ed9e76a30a`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        cardsGenerator(info);
      });
  };
};

onSearch();
//
const cardsGenerator = (info) => {
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
