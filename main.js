fetch(
  "https://gateway.marvel.com/v1/public/comics?apikey=5b28d7dfab933cb0faf686ed9e76a30a"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
