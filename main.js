const cardsLayout = document.querySelector(".cards-layout");

fetch(
  "https://gateway.marvel.com/v1/public/comics?apikey=5b28d7dfab933cb0faf686ed9e76a30a"
)
  .then((res) => {
    return res.json();
  })
  .then((info) => {
    console.log(info);
    info.data.results.map((comic) => {
      // console.log(info.data.results);

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
  });
