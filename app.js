document.getElementById("search-field").addEventListener("keyup", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    await search();
  }
});

const search = async () => {
  const field = document.getElementById("search-field");
  if (field.value) await fetchResult(field.value);
};

const fetchResult = async (query) => {
  const htmlToBeRendered = [];
  const mainSection = document.getElementById("main");
  mainSection.classList = "h-[50vh] flex flex-col justify-center items-center";
  mainSection.innerHTML = `
    <img src='./src/loading-white.svg'>
  `;

  let searchResult = await fetch(
    `http://www.omdbapi.com/?apikey=8b5b8670&s=${query}`
  );
  searchResult = await searchResult.json();
  const ids = searchResult.Search.map((Value) => Value.imdbID);

  for (let id of ids) {
    let res = await fetch(
      `http://www.omdbapi.com/?apikey=8b5b8670&plot=full&i=${id}`
    );
    res = await res.json();

    // Trim plot to 85 chars only
    if (res.Plot && res.Plot.length > 360)
      res.Plot = res.Plot.slice(0, 360) + "....";

    if (res.Poster == "N/A") res.Poster = "https://via.placeholder.com/150x225";

    htmlToBeRendered.push(`
  <div id="movie-element"
      class="text-white w-[90%] mx-auto text-center flex flex-col items-center md:flex-row md:text-start">
      <img
        src="${res.Poster}"
        class="w-[200px] mb-6 rounded-lg md:w-[150px] md:mb-0 md:mr-6" alt="">

      <div id="movie-details" class="w-[90%] space-y-2">
        <!-- Title Row  -->
        <div id="row-1">
          <h2 class="font-bold inline text-2xl">${res.Title}</h2>
          <p id="rating" class="inline text-sm">
            <span id="stars"><img src="src/start-icon.png" class="inline mx-1"></span>
            ${res.imdbRating}
          </p>
        </div>

        <!-- Meta Row  -->
        <div id="row-2" class="font-light text-sm flex flex-col items-center md:flex-row md:justify-start">
          <div>
            <span>${res.Runtime}</span>
            <span>${res.Genre}</span>
          </div>
          <a href="#" class="flex items-center">
            <img src="src/plus-icon.png" class="inline w-4 mr-2 my-4 md:ml-6" alt="">
            <span class="font-bold md:font-normal">Watchlist</span>
          </a>
        </div>

        <!-- Plot Row  -->
        <div id="row-3">
          <p class="text-neutral-400 leading-[1.8] text-sm">
            ${res.Plot}
          </p>
        </div>
      </div>
    </div>

    <hr class="border-1 mx-auto w-[90%] border-neutral-700">
  `);
  }
  mainSection.classList = "space-y-8";
  mainSection.innerHTML = htmlToBeRendered.join("\n");
};
