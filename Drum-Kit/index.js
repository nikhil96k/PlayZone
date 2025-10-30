var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {

  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

  });

}

document.addEventListener("keypress", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});


function makeSound(key) {

  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;

    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;

    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;


    default: console.log(key);

  }
}


function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);

}







// **********************DASHBOARD***********************

// Get game stats from localStorage
const gameName = "Drum Kit"; // Or you can set this dynamically
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

