// Select elements
const items = document.querySelectorAll(".draggable");
const bins = document.querySelectorAll(".bin");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let score = 0;
let timeLeft = 60;

// Object mapping items to correct bins
const correctBins = {
  banana: "compost",
  bottle: "recycling",
  newspaper: "paper",
};

// Drag-and-drop functionality
items.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("id", event.target.id);
  });
});

bins.forEach((bin) => {
  bin.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  bin.addEventListener("drop", (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("id");
    const correctBin = correctBins[itemId];

    if (bin.id === correctBin) {
      score += 10;
      feedback.textContent = `✅ Correct! ${itemId} belongs in ${correctBin}.`;
      document.getElementById(itemId).remove();
    } else {
      feedback.textContent = `❌ Wrong! ${itemId} doesn't belong in ${bin.id}.`;
    }

    scoreDisplay.textContent = score;
  });
});

// Timer
let countdown = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    feedback.textContent = "Time's up! Game Over!";
    document
      .querySelectorAll(".draggable")
      .forEach((item) => (item.draggable = false));
  }
}, 1000);

// Restart Game
restartButton.addEventListener("click", () => {
  location.reload();
});
