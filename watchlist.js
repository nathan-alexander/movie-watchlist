const baseURL = "http://www.omdbapi.com/?apikey=51bdef03";
let watchList = [];
//build watchlist from localstorage
async function getWatchlist() {
  let movieKeys = Object.keys(localStorage);
  watchList = [];
  for (let i = 0; i < movieKeys.length; i++) {
    let response = await fetch(`${baseURL}&i=${movieKeys[i]}`);
    let data = await response.json();
    console.log(data);
    watchList.push(data);
  }
  createMovieCards(watchList);
}
//remove items from watchlist
async function removeFromWatchlist(id) {
  localStorage.removeItem(id);
  getWatchlist();
}

//Diplay Functionality
function createMovieCards(movieArray) {
  let movieHtml = "";
  document.getElementById("watchlist").innerHTML = movieHtml;
  if (movieArray.length > 0) {
    for (let movie of movieArray) {
      movieCard = `
                  <div class="movie-card">
                      <div class="movie-poster">
                          <img src="${movie.Poster}" />
                      </div>
                      <div class="movie-information">
                          <p class="movie-tite">${movie.Title} <span class="rating">⭐️ ${movie.imdbRating}</span></p>
                          <div>${movie.Runtime} | ${movie.Genre} <button class="watchlist-button" id="add-watchlist" onclick="removeFromWatchlist('${movie.imdbID}')">Remove</button></div>
                          <p class="movie-plot">${movie.Plot}
                      </div>
                  </div>
              `;
      movieHtml += movieCard;
    }
    document.getElementById("watchlist").innerHTML = movieHtml;
  } else {
    document.getElementById(
      "watchlist"
    ).innerHtml = `<h3>No movies in watchlist</h3>`;
  }
}

getWatchlist();
