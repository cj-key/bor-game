document.addEventListener("DOMContentLoaded", function() {
    // Amendment Cards data
    const amendments = [
      { number: 1, description: "The freedom of speech, religion, and the press.", correctAnswer: 1 },
      { number: 2, description: "The right to bear arms.", correctAnswer: 2 },
      { number: 3, description: "Protection against quartering of troops.", correctAnswer: 3 },
      { number: 4, description: "Protection against unreasonable searches and seizures.", correctAnswer: 4 },
      { number: 5, description: "Protection of rights to life, liberty, and property.", correctAnswer: 5 },
      { number: 6, description: "Rights of accused persons in criminal cases.", correctAnswer: 6 },
      { number: 7, description: "Rights in civil cases.", correctAnswer: 7 },
      { number: 8, description: "Excessive bail, cruel punishment.", correctAnswer: 8 },
      { number: 9, description: "Rights retained by the people.", correctAnswer: 9 },
      { number: 10, description: "Powers retained by the states and the people.", correctAnswer: 10 }
    ];
  
    // Description Tiles data
    const descriptionTiles = amendments.map(amendment => {
      return { description: amendment.description, correctAnswer: amendment.correctAnswer };
    });
  
    // Function to shuffle an array randomly
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Function to create Amendment Cards
    function createAmendmentCards() {
      const cardsContainer = document.getElementById("cards-container");
      amendments.forEach(amendment => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = amendment.number;
        card.dataset.description = amendment.description;
        card.dataset.correctAnswer = amendment.correctAnswer;
        cardsContainer.appendChild(card);
      });
    }
  
// Function to create Description Tiles
function createDescriptionTiles() {
  const tilesContainer = document.getElementById("tiles-container");
  shuffleArray(descriptionTiles).forEach(tile => {
    const description = tile.description;
    const correctAnswer = tile.correctAnswer;
    const tileElement = document.createElement("div");
    tileElement.className = "tile";
    tileElement.textContent = description;
    tileElement.dataset.correctAnswer = correctAnswer;
    tileElement.draggable = true;
    tileElement.dataset.selected = "false"; // Add data-selected attribute
    tilesContainer.appendChild(tileElement);
  });
}

  
    // Initialize the game
    function initializeGame() {
      createAmendmentCards();
      createDescriptionTiles();
    }
  
    // Call the initializeGame function when the page finishes loading
    initializeGame();
  
    let startTime = null;
    let endTime = null;
    let correctAnswers = 0;
    let timerInterval = null;
    let elapsedTime = 0;
    let selectedAnswers = [];
  
    // Function to update the timer display
    function updateTimer() {
      const timerValue = document.getElementById("timer-value");
      timerValue.textContent = Math.floor(elapsedTime / 1000); // Display elapsed time in seconds
    }
  
    // Function to start the timer
    function startTimer() {
      if (startTime === null) {
        startTime = performance.now(); // Store the starting timestamp
        timerInterval = setInterval(function() {
          const currentTime = performance.now(); // Get the current timestamp
          elapsedTime = currentTime - startTime; // Calculate elapsed time
          updateTimer(); // Update the timer display
        }, 1000);
      }
    }
  
    // Function to stop the timer
    function stopTimer() {
      clearInterval(timerInterval);
      elapsedTime += Math.floor((performance.now() - startTime) / 1000); // Calculate the final elapsed time in seconds
      updateTimer(); // Update the timer display
    }
  
    // Event listener for starting the drag
    document.addEventListener("dragstart", function(event) {
      const target = event.target;
      if (target.classList.contains("tile")) {
        event.dataTransfer.setData("text/plain", target.textContent);
        startTimer(); // Start the timer if it's not already started
      }
    });
  
    // Event listener for allowing the drop
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
  
// Event listener for dropping the tile onto a card
document.addEventListener("drop", function(event) {
  event.preventDefault();
  const targetCard = event.target;
  if (targetCard.classList.contains("card") && !targetCard.classList.contains("flipped")) {
    const tileContent = event.dataTransfer.getData("text/plain");
    targetCard.textContent = tileContent;
    targetCard.classList.add("flipped");
    selectedAnswers.push(tileContent);

    const selectedTile = document.querySelector(`.tile[data-selected="false"][data-correct-answer="${targetCard.dataset.correctAnswer}"]`);
    if (selectedTile) {
      selectedTile.dataset.selected = "true"; // Mark the selected answer tile as "selected"
      selectedTile.style.display = "none"; // Hide the selected answer tile
    }
  }
});

  
    // Check Answer button functionality
    const checkAnswerButton = document.getElementById("check-answer");
    checkAnswerButton.addEventListener("click", function() {
      if (endTime === null) {
        endTime = Date.now(); // Stop the timer if it's not already stopped
        stopTimer();
      }
      const elapsedTimeInSeconds = Math.floor(elapsedTime / 1000); // Calculate elapsed time in seconds

  
      // Disable further dragging and clicking
      const tiles = document.querySelectorAll(".tile");
      tiles.forEach(tile => {
        tile.draggable = false;
        tile.style.cursor = "default";
      });
      checkAnswerButton.disabled = true;
  
      // Calculate score
      correctAnswers = 0;
      const flippedCards = document.querySelectorAll('.card.flipped');
      flippedCards.forEach(card => {
        const description = card.dataset.description;
        const correctAnswer = parseInt(card.dataset.correctAnswer);
        const selectedTile = document.querySelector(`[data-correct-answer="${correctAnswer}"]`);
        if (selectedTile && selectedTile.textContent === description) {
          correctAnswers++;
        }
      });
  
      // Calculate score out of 10
      const correctScore = correctAnswers > 10 ? 10 : correctAnswers;
      const incorrectScore = amendments.length - correctAnswers;
  
      // Display results popup
      const resultsPopup = document.getElementById("results-popup");
      const scoreText = document.getElementById("score");
      const timeText = document.getElementById("time");
      scoreText.textContent = `Score: ${correctScore}/${amendments.length}`;
      timeText.textContent = `Time: ${elapsedTimeInSeconds} seconds`;
      resultsPopup.style.display = "block";
  
      // Restart button functionality
      const restartButton = document.getElementById("restart");
      restartButton.addEventListener("click", function() {
        resultsPopup.style.display = "none";
        resetGame();
      });
    });
  
    // Reset the game
    function resetGame() {
      const cardsContainer = document.getElementById("cards-container");
      const tilesContainer = document.getElementById("tiles-container");
  
      // Remove all cards
      while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
  
      // Remove all tiles
      while (tilesContainer.firstChild) {
        tilesContainer.removeChild(tilesContainer.firstChild);
      }
  
      // Reset variables
      startTime = null;
      endTime = null;
      correctAnswers = 0;
      elapsedTime = 0;
      clearInterval(timerInterval);
      selectedAnswers = [];
  
      // Reinitialize the game
      initializeGame();
  
      // Enable dragging and clicking
      const tiles = document.querySelectorAll(".tile");
      tiles.forEach(tile => {
        tile.draggable = true;
        tile.style.cursor = "grab";
      });
  
      // Enable check answer button
      checkAnswerButton.disabled = false;
      updateTimer();
    }
  });
  