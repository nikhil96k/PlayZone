
let rnum1, rnum2;
let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let totalRounds = 2; // default
let roundResults = [];

const roundSelect = document.getElementById("rounds");
const player1Btn = document.getElementById("Player1");
const player2Btn = document.getElementById("Player2");

roundSelect.addEventListener("change", () => {
  totalRounds = parseInt(roundSelect.value);
  resetGame();
});

function play1() {
  if (currentRound > totalRounds) return alert("Game over! Refresh to play again.");

  rnum1 = Math.floor(Math.random() * 6 + 1);
  document.querySelectorAll("img")[0].setAttribute("src", "images/dice" + rnum1 + ".png");
  
  // Disable Player 1, Enable Player 2
  player1Btn.disabled = true;
  player2Btn.disabled = false;

  // 🎯 Highlight Player 2's turn
  setActivePlayer(2);
}

function play2() {
  if (!rnum1) return alert("Player 1 must play first!");
  if (currentRound > totalRounds) return alert("Game over! Refresh to play again.");

  rnum2 = Math.floor(Math.random() * 6 + 1);
  document.querySelectorAll("img")[1].setAttribute("src", "images/dice" + rnum2 + ".png");

  // Determine round winner
  let resultText;
  if (rnum1 > rnum2) {
    resultText = `Round ${currentRound}: Player 1 wins! (${rnum1} vs ${rnum2})`;
    player1Score++;
  } else if (rnum1 < rnum2) {
    resultText = `Round ${currentRound}: Player 2 wins! (${rnum1} vs ${rnum2})`;
    player2Score++;
  } else {
    resultText = `Round ${currentRound}: Draw! (${rnum1} vs ${rnum2})`;
  }

  roundResults.push(resultText);
  updateRoundResults();

  currentRound++;
  rnum1 = null;
  rnum2 = null;

  // Disable Player 2 and enable Player 1 for next round
  player1Btn.disabled = false;
  player2Btn.disabled = true;

  // 🎯 Highlight Player 1's turn
  setActivePlayer(1);

  // If last round, show final winner
  if (currentRound > totalRounds) {
    let finalResult;
    if (player1Score > player2Score) {
      finalResult = "🎉 Player 1 Wins the Game! 🎉";
    } else if (player2Score > player1Score) {
      finalResult = "🎉 Player 2 Wins the Game! 🎉";
    } else {
      finalResult = "🤝 The Game is a Draw!";
    }
    document.querySelector("h1").innerHTML = finalResult;

    // Stop blinking after game ends
    player1Btn.classList.remove("blinking");
    player2Btn.classList.remove("blinking");
  }
}

function setActivePlayer(playerNum) {
  // Remove previous highlights
  player1Btn.classList.remove("blinking");
  player2Btn.classList.remove("blinking");

  // Add blink to active player
  if (playerNum === 1) {
    player1Btn.classList.add("blinking");
  } else {
    player2Btn.classList.add("blinking");
  }
}

function updateRoundResults() {
  const ul = document.getElementById("roundResults");
  ul.innerHTML = "";
  roundResults.forEach(res => {
    const li = document.createElement("li");
    li.textContent = res;
    ul.appendChild(li);
  });
}

function refresh() {
  window.location.reload();
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  currentRound = 1;
  roundResults = [];
  rnum1 = null;
  rnum2 = null;
  document.querySelector("h1").innerHTML = "Dice Game 🎲";
  updateRoundResults();

  player1Btn.disabled = false;
  player2Btn.disabled = true;

  // 🎯 Highlight Player 1 by default
  setActivePlayer(1);
}

// Initially disable Player 2 until Player 1 plays
player2Btn.disabled = true;
setActivePlayer(1);



// **********************DASHBOARD***********************

// Get game stats from localStorage
const gameName = "Dice Game";
let stats = JSON.parse(localStorage.getItem('gameStats')) || {};

// Initialize the game stats if not present
if (!stats[gameName]) {
    stats[gameName] = { plays: 0, totalTime: 0, lastStart: Date.now() };
} else {
    stats[gameName].lastStart = Date.now(); // start timing when game page loads
}

// Save immediately
localStorage.setItem('gameStats', JSON.stringify(stats));

// Track time played when user leaves the game page
window.addEventListener('beforeunload', () => {
    const stats = JSON.parse(localStorage.getItem('gameStats')) || {};
    if (stats[gameName] && stats[gameName].lastStart) {
        const playedTime = Math.floor((Date.now() - stats[gameName].lastStart) / 1000); // seconds
        stats[gameName].totalTime += playedTime;
        stats[gameName].lastStart = 0; // reset lastStart
        localStorage.setItem('gameStats', JSON.stringify(stats));
    }
});










