
//initial values
let happiness = 50;
let health = 50;
let money = 50;

//which card selected?
let selectedOption = null;
let selectedDay = null;

const allCards = document.querySelectorAll(".card");

allCards.forEach((card) => {
  card.addEventListener("click", function () {
    const id = card.id; //
    const parts = id.split("-"); // ["day3", "option2"]
    const day = parts[0];
    const option = parseInt(parts[1].replace("option", ""));

    //we are saving which option and day the user has selected
    selectedOption = option;
    selectedDay = day;

    //ensures only one card selected per day
    const all = document.querySelectorAll(`#${day} .card`);
    all.forEach((el) => el.classList.remove("selected"));
    card.classList.add("selected");
  });
});


document.getElementById("startBtn").onclick = function () {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = parseInt(document.getElementById("age").value, 10);

  if (!firstName || !lastName || !age) {
    alert("Please fill in all the fields.");
    return;
  }

  if (age < 18) {
    alert("You must be at least 18 years old to start the game.");
    return;
  }
//if requierements met, starts the game
  document.querySelector(".container").style.display = "none";
  document.getElementById("day1").style.display = "block";
};

//next button 
for (let i = 1; i <= 7; i++) {
  document.getElementById(`nextDay${i}`).onclick = function () {
    if (selectedOption === null || selectedDay === null) {
      alert("Please make a choice");
      return;
    }

    applyPoints(selectedDay, selectedOption);

    document.getElementById(`day${i}`).style.display = "none";
    if (i < 7) {
      document.getElementById(`day${i + 1}`).style.display = "block";
    } else {
      showResults();
    }

    //resets the selections
    selectedOption = null;
    selectedDay = null;
  };
}

//function that increases points based on selections
function applyPoints(day, option) {
  if (day === "day1") {
    if (option === 1) { happiness += 5;  }
    if (option === 2) { health += 10; }
    if (option === 3) { happiness += 3; }
  }
  if (day === "day2") {
    if (option === 1) { happiness += 10; }
    if (option === 2) { health -= 5; money -= 5; }
    if (option === 3) { happiness += 6; }
  }
  if (day === "day3") {
    if (option === 1) { health += 3; }
    if (option === 2) { happiness += 5; }
    if (option === 3) { happiness += 6; }
  }
  if (day === "day4") {
    if (option === 1) { health += 5; }
    if (option === 2) { happiness += 3; }
    if (option === 3) { happiness += 7; money -= 7; }
  }
  if (day === "day5") {
    if (option === 1) { happiness += 8; money -= 10; }
    if (option === 2) { happiness += 6; money -= 7; }
    if (option === 3) { happiness += 5; health -= 5; }
  }
  if (day === "day6") {
    if (option === 1) { happiness += 10; money -= 10; }
    if (option === 2) { happiness += 6; money -= 5; }
    if (option === 3) { happiness += 8; money -= 8; }
  }
  if (day === "day7") {
    if (option === 1) { health += 5; happiness += 6; }
    if (option === 2) { health += 4; happiness += 5; }
    if (option === 3) { happiness += 4; }
  }
}

//function that shows results
function showResults() {
  document.getElementById("results-screen").style.display = "block";

  document.getElementById("bar-happiness").style.width = happiness + "%";
  document.getElementById("bar-happiness").textContent = happiness;

  document.getElementById("bar-health").style.width = health + "%";
  document.getElementById("bar-health").textContent = health;

  document.getElementById("bar-wealth").style.width = money + "%";
  document.getElementById("bar-wealth").textContent = money;

  const average = (happiness + health + money) / 3;
  let message = "";

  if (money < 30) {
    message = "You ran out of money this week. Budgeting is key!";
  } else if (health < 30) {
    message = "You neglected your health. Try to take care of yourself.";
  } else if (happiness < 30) {
    message = "You seemed unhappy this week. Don't forget to enjoy life.";
  } else if (average >= 80) {
    message = "Amazing! You're really living your best life! 🎉";
  } else if (average >= 50) {
    message = "You made some good choices, but there's room for improvement!";
  } else {
    message = "It looks like this week was tough. Let's try for a better next week!";
  }

  document.querySelector(".results-message").textContent = message;
}
  //result message
//   let message = "";

// if (average >= 50) {
//   message = `Amazing! You're really living your best life! 🎉`;
// } else if (average >= 30) {
//   message = `seks`;
// } else {
//   message = `It looks like this week was tough. Let's try for a better next week!`;
// }

// const messageEl = document.querySelector(".results-message");
// messageEl.textContent = message;
// }

//restart button
document.getElementById("restartBtn").onclick = function () {
  location.reload();
};
