const removeFromWatchlist = (id) => {
  localStorage.removeItem(id);
  location.reload();
};

const getData = () => {
  const elementsLen = localStorage.length;
  if (elementsLen) {
    const mainSection = document.getElementById("main");
    mainSection.classList =
      "h-[50vh] flex flex-col justify-center items-center";
    mainSection.innerHTML = `
  <img src='./src/loading-white.svg'>
`;
  }
  let htmlToBeRendered = [];
  for (let i = 0; i < elementsLen; i++) {
    const id = localStorage.key(i);
    const res = JSON.parse(localStorage.getItem(id));
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
          <button onclick="removeFromWatchlist('${id}')" class="flex items-center">
            <img src="src/minus-icon.png" class="inline w-4 mr-2 my-4 md:ml-6" alt="">
            <span class="font-bold md:font-normal">Remove</span>
          </button>
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

  return htmlToBeRendered;
};

let htmlToBeRendered = getData();
if (htmlToBeRendered.length != 0) {
  const mainSection = document.getElementById("main");
  mainSection.classList = "space-y-8 mt-12 md:mt-20";
  mainSection.innerHTML = htmlToBeRendered.join("\n");
}
