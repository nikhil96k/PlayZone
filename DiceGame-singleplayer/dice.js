
// var rnum1,rnum2

// function play1(){
// rnum1=Math.floor(Math.random()*6+1)
// var rimg1="images/dice"+rnum1+".png"
// var img1=document.querySelectorAll("img")[0]
// img1.setAttribute("src",rimg1)
// }


// function play2(){
// rnum2=Math.floor(Math.random()*6+1)
// var rimg2="images/dice"+rnum2+".png"
// var img2=document.querySelectorAll("img")[1]
// img2.setAttribute("src",rimg2)

// if(rnum1>rnum2){
//     document.querySelector("h1").innerHTML="Player 1 is Win!"
// }else if(rnum1==rnum2){
//     document.querySelector("h1").innerHTML="Draw Match!"
// }else{
//     document.querySelector("h1").innerHTML="Player 2 is Win!"
// }

// }





// function refresh(){
//     window.location.reload();
// }










let rnum1, rnum2;
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let totalRounds = 2;
let roundResults = [];

const roundSelect = document.getElementById("rounds");
roundSelect.addEventListener("change", () => {
  totalRounds = parseInt(roundSelect.value);
  resetGame();
});

function playPlayer() {
  if (currentRound > totalRounds) return alert("Game over! Refresh to play again.");

  // Player rolls
  rnum1 = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".img1").setAttribute("src", "images/dice" + rnum1 + ".png");

  document.getElementById("Player1").disabled = true;
  toggleBlink("Player1", false);
  toggleBlink("Computer", true);

  // 🆕 Change computer button text while rolling
  const compBtn = document.getElementById("Computer");
  compBtn.innerText = "Computer Rolling...";

  // Computer plays automatically after 1 second
  setTimeout(playComputer, 1000);
}

function playComputer() {
  if (currentRound > totalRounds) return;

  rnum2 = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".img2").setAttribute("src", "images/dice" + rnum2 + ".png");

  let resultText;
  if (rnum1 > rnum2) {
    resultText = `Round ${currentRound}: 🧍 Player Wins! (${rnum1} vs ${rnum2})`;
    playerScore++;
  } else if (rnum1 < rnum2) {
    resultText = `Round ${currentRound}: 🤖 Computer Wins! (${rnum1} vs ${rnum2})`;
    computerScore++;
  } else {
    resultText = `Round ${currentRound}: Draw! (${rnum1} vs ${rnum2})`;
  }

  roundResults.push(resultText);
  updateRoundResults();

  currentRound++;

  document.getElementById("Player1").disabled = false;
  toggleBlink("Computer", false);
  toggleBlink("Player1", true);

  // 🆕 Reset computer button text after its turn
  const compBtn = document.getElementById("Computer");
  compBtn.innerText = "Computer";

  if (currentRound > totalRounds) {
    showFinalResult();
  }
}

function showFinalResult() {
  let finalResult;
  if (playerScore > computerScore) {
    finalResult = "🎉 You Win the Game! 🎉";
  } else if (computerScore > playerScore) {
    finalResult = "🤖 Computer Wins the Game!";
  } else {
    finalResult = "🤝 The Game is a Draw!";
  }
  document.querySelector("h1").innerHTML = finalResult;
  toggleBlink("Player1", false);
  toggleBlink("Computer", false);

  // 🆕 Also ensure final button text resets
  document.getElementById("Computer").innerText = "Computer";
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
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  roundResults = [];
  rnum1 = null;
  rnum2 = null;
  document.querySelector("h1").innerHTML = "🎲 Player vs Computer 🎲";
  updateRoundResults();
  document.getElementById("Player1").disabled = false;
  toggleBlink("Player1", true);
  toggleBlink("Computer", false);

  // 🆕 Reset computer button text
  document.getElementById("Computer").innerText = "Computer";
}

// Blink animation
function toggleBlink(id, shouldBlink) {
  const btn = document.getElementById(id);
  if (shouldBlink) {
    btn.classList.add("blink");
  } else {
    btn.classList.remove("blink");
  }
}

// Start blinking Player button initially
toggleBlink("Player1", true);
document.getElementById("Computer").innerText = "Computer";













