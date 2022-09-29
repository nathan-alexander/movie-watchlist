let baseURL = `http://www.omdbapi.com/?apikey=51bdef03`;
let movieArray = [];
let movieWatchlist = [];
localStorage.clear(); // remove this later
//Search Functionality
async function search(searchText) {
  let response = await fetch(`${baseURL}&s=${searchText}`);
  let data = await response.json();
  if (data.Response === "True") {
    let searchResults = data.Search;
    movieArray = [];
    for (searchResult of searchResults) {
      let response = await fetch(`${baseURL}&i=${searchResult.imdbID}`);
      let data = await response.json();
      console.log(data);
      movieArray.push(data);
    }
    createMovieCards(movieArray);
  } else {
    showError();
  }
}

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let searchText = document.getElementById("search-text").value;
  search(searchText);
});

function showError() {
  document.getElementById("movies").innerHTML = `<h3>No movies found!</h3>`;
}

//Diplay Functionality
function createMovieCards(movieArray) {
  let movieHtml = "";

  if (movieArray.length > 0) {
    for (let movie of movieArray) {
      movieCard = `
                <div class="movie-card">
                    <div class="movie-poster">
                        <img src="${movie.Poster}" />
                    </div>
                    <div class="movie-information">
                        <p class="movie-title">${movie.Title} <span class="rating">⭐️ ${movie.imdbRating}</span></p>
                        <div>${movie.Runtime} | ${movie.Genre} <button class="watchlist-button" id="add-watchlist" onclick="addToWatchlist('${movie.imdbID}')">Add to Watchlist</button></div>
                        <p class="movie-plot">${movie.Plot}
                    </div>
                </div>
            `;
      movieHtml += movieCard;
    }
    document.getElementById("movies").innerHTML = movieHtml;
  }
}

let addToWatchlist = function (id) {
  localStorage.setItem(id, id);
};
