// Replace with your actual RAWG API key and base URL.
const API_KEY = "5b222bbaa5a744f6a1b9646bf3d1af3a";//key shouldnt be here but who sees this anyways
const platform = "7"; // For example, Xbox One (verify with RAWG docs)
const RAWG_BASE_URL = "https://api.rawg.io/api";

// Local cache for games
let gamesCache = [];

// Option 1: Fetch games from a random page
async function fetchGames() {
  try {
    const totalPages = 50; // Adjust according to RAWG data
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const url = `${RAWG_BASE_URL}/games?platforms=${platform}&page=${randomPage}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    gamesCache = data.results;
  } catch (error) {
    console.error("Error fetching games from RAWG:", error);
    gamesCache = [];
  }
}

// Get a random game from the local cache
function getRandomGame() {
  if (!gamesCache || gamesCache.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * gamesCache.length);
  console.log("Random index:", randomIndex, "of", gamesCache.length);
  return { game: gamesCache[randomIndex], index: randomIndex };
}

// Display a game on the page
async function showGame() {
  const gameInfoDiv = document.getElementById("game-info");
  gameInfoDiv.innerHTML = "<p>Loading game...</p>";

  // If cache is empty, fetch new games
  if (!gamesCache || gamesCache.length === 0) {
    await fetchGames();
  }

  const result = getRandomGame();
  if (!result) {
    gameInfoDiv.innerHTML = "<p>No more games available!</p>";
    disableButtons();
    return;
  }
  const { game, index } = result;
  // Save the current game's index in a data attribute so it can be removed after feedback.
  gameInfoDiv.dataset.currentGameIndex = index;

  // Build the HTML with a title, image, and description.
  let imageHtml = "";
  if (game.background_image) {
    imageHtml = `<div class="image-container">
                   <img src="${game.background_image}" alt="${game.name} cover image">
                 </div>`;
  }
  gameInfoDiv.innerHTML = `
    <div class="game-title">${game.name}</div>
    ${imageHtml}
    <div class="game-description">
      Released: ${game.released ? game.released : "Unknown"}<br>
      Rating: ${game.rating ? game.rating : "N/A"}
    </div>
  `;
}

// Disable the like/dislike buttons when no more games exist
function disableButtons() {
  document.getElementById("like-button").disabled = true;
  document.getElementById("dislike-button").disabled = true;
}

// Set up feedback event listeners
function setupFeedbackButtons() {
  const likeButton = document.getElementById("like-button");
  const dislikeButton = document.getElementById("dislike-button");
  const gameInfoDiv = document.getElementById("game-info");

  likeButton.addEventListener("click", async function () {
    const currentIndex = gameInfoDiv.dataset.currentGameIndex;
    if (currentIndex !== undefined) {
      // Optionally record feedback here.
      gamesCache.splice(currentIndex, 1); // Remove the current game from cache
      showGame();
    }
  });

  dislikeButton.addEventListener("click", async function () {
    const currentIndex = gameInfoDiv.dataset.currentGameIndex;
    if (currentIndex !== undefined) {
      // Optionally record feedback here.
      gamesCache.splice(currentIndex, 1);
      showGame();
    }
  });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  setupFeedbackButtons();
  showGame();
});