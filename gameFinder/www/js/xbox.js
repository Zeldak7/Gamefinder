let games = [
    { title: "Halo: Combat Evolved", description: "An iconic first-person shooter that started it all." },
    { title: "Gears of War", description: "Action-packed cover-based shooter with an engaging story." },
    { title: "Forza Horizon", description: "A beautiful, open-world racing game with dynamic seasons." },
    { title: "Fable", description: "An action role-playing game set in a fantasy world." },
    { title: "Minecraft", description: "A sandbox game about placing blocks and going on adventures." }
  ];
  const likedGames = [];
  const dislikedGames = [];
  
  function getRandomGame() {
    if (games.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * games.length);
    return { game: games[randomIndex], index: randomIndex };
  }
  
  function showGame() {
    const gameInfoDiv = document.getElementById("game-info");
    const result = getRandomGame();
    if (!result) {
      gameInfoDiv.innerHTML = "<p>No more games to show!</p>";
      document.getElementById("like-button").disabled = true;
      document.getElementById("dislike-button").disabled = true;
      return;
    }
    const game = result.game;
    gameInfoDiv.innerHTML = `
      <div class="game-title">${game.title}</div>
      <div class="game-description">${game.description}</div>
    `;
    gameInfoDiv.dataset.currentIndex = result.index;
  }
  
  document.getElementById("like-button").addEventListener("click", function() {
    const gameInfoDiv = document.getElementById("game-info");
    const currentIndex = gameInfoDiv.dataset.currentIndex;
    if (currentIndex !== undefined) {
      likedGames.push(games[currentIndex]);
      games.splice(currentIndex, 1);
    }
    showGame();
  });
  
  document.getElementById("dislike-button").addEventListener("click", function() {
    const gameInfoDiv = document.getElementById("game-info");
    const currentIndex = gameInfoDiv.dataset.currentIndex;
    if (currentIndex !== undefined) {
      dislikedGames.push(games[currentIndex]);
      games.splice(currentIndex, 1);
    }
    showGame();
  });
  
  // Show the first game when the page loads
  showGame();