/**
 * Returns the computer's randomly generated option for a round of Rock, Paper,
 * Scissors.
 *
 * @return {string} The computer's randomly generated option.
 */
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

/**
 * Returns true if the player has won the round given the player and computer's
 * chosen options, false otherwise.
 *
 * @param {string} player - The player's chosen option.
 * @param {string} computer - The computer's chosen option.
 * @return {boolean} True if the player has won the round, false otherwise.
 */
function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

let playerScore = 0;
let computerScore = 0;

/**
 * Determines the result of a round of Rock, Paper, Scissors given the
 * user's chosen option.
 *
 * @param {string} userOption - The user's chosen option.
 * @return {string} The result of the round.
 */
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

/**
 * Updates the displayed results of the round given the user's chosen option.
 *
 * @param {string} userOption - The user's chosen option.
 */
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

/**
 * Resets the state of the game.
 *
 * This function resets the player and computer scores to 0, updates the
 * displayed scores in the DOM, hides the reset game button, shows the options
 * container, and clears the content of the winner message and results message.
 */
function resetGame() {
  // Reset player and computer scores to 0
  playerScore = 0;
  computerScore = 0;

  // Update the displayed scores in the DOM
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;

  // Hide the reset game button
  resetGameBtn.style.display = "none";

  // Show the options container for the player to play again
  optionsContainer.style.display = "block";

  // Clear the content of winnerMsgElement and roundResultsMsg
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = ""; // Clear the results message
}

// Add event listeners to buttons
document
  .getElementById("rock-btn")
  .addEventListener("click", () => showResults("Rock"));
document
  .getElementById("paper-btn")
  .addEventListener("click", () => showResults("Paper"));
document
  .getElementById("scissors-btn")
  .addEventListener("click", () => showResults("Scissors"));
resetGameBtn.addEventListener("click", resetGame);
