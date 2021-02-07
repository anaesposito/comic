const cardsLayout = document.querySelector(".cards-layout");

fetch(
  "https://gateway.marvel.com/v1/public/comics?apikey=5b28d7dfab933cb0faf686ed9e76a30a"
)
  .then((res) => {
    return res.json();
  })
  .then((info) => {
    // console.log(data.data.results);
    info.data.results.map((comic) => {
      console.log(info.data.results);
      // console.log(comic.characters);
      cardsLayout.innerHTML += `<article>
          <div class="comic-article"><img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt=""></div>
          <p></p>
      </article>`;
    });
  });
