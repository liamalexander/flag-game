const getFlag = document.querySelector(".get-flag");
const nameCountry = document.querySelector(".name");
const flag = document.querySelector(".flag");
const guessField = document.querySelector(".guess");
const checkFlag = document.querySelector(".check-flag");
const guessOptions = document.querySelector(".guess-options");
const cleatBtn = document.querySelector(".clear");
const scoreDisplay = document.querySelector(".score-container");
const livesHolder = document.querySelector(".lives");
const scoreHolder = document.querySelector(".score");

let randomNumber;
let data;
let score = 0;
// let lives = 3;
let lives = ["\u2665", "\u2665", "\u2665"];

// lives.forEach(life => {
//   life.style.color = "red";
// });

const getData = async function () {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
  // const data = await res.json();
  data = await res.json();
  // console.log(data);
  // randomNumber;
  // let randomNumber = Math.floor(Math.random() * 249);
  randomNumber = Math.floor(Math.random() * 249);
  // nameCountry.textContent = data[randomNumber].name.common;
  // flag.style.display = "block";
  flag.style.visibility = "visible";
  flag.src = data[randomNumber].flags.png;
  // guessField.style.display = "block";
  guessField.style.visibility = "visible";
  checkFlag.style.visibility = "visible";
  cleatBtn.style.visibility = "visible";
  scoreDisplay.style.visibility = "visible";
  livesHolder.textContent = `Lives: ${lives.join("  ")}`;
};

const checkAnswer = function () {
  // console.log(guessField.value);
  // console.log(data[randomNumber].name.common.toLowerCase());
  // console.log(randomNumber);
  if (guessField.value.toLowerCase() == data[randomNumber].name.common.toLowerCase()) {
    guessField.style.background = "green";
    score++;
    scoreHolder.textContent = `Score: ${score}`;
  } else {
    guessField.style.background = "red";
    // lives--;
    lives.pop();
    livesHolder.textContent = `Lives: ${lives.join("  ")}`;
  }
};

const filterCountries = function() {
  let filteredCountries = [];
  guessOptions.textContent = "";

  data.forEach(country => {
    // console.log(country.name.common);

    if (guessField.value.length >= 3 && country.name.common.toLowerCase().includes(guessField.value.toLowerCase())) {
      filteredCountries.push(country.name.common);
    }
  })

  filteredCountries.forEach(country => {
    const newLiItem = document.createElement("li");
    newLiItem.textContent = country;
    newLiItem.id = country;
    guessOptions.appendChild(newLiItem);
    if (newLiItem) {
      guessField.style.borderBottomLeftRadius = 0;
    }
  })
  // if (newLiItem) {
  //   guessField.style.borderBottomLeftRadius = 0;
  // } else {
  //   guessField.style.borderBottomLeftRadius = "5px";
  // }
}

const fillInput = function (e) {
  guessField.value = e.target.id;
  // filterCountries;
  guessOptions.textContent = "";
};

const clearInput = function() {
  guessField.value = "";
  guessOptions.textContent = "";
};

guessField.addEventListener("keyup", filterCountries);

// ADD A CORRECT / INCORRECT DISPLAY AND REMOVE THE COLOURS IN BACKGROUND - animation that all screen goes
//  green or red for a second or so...from top to bottom or left to right?  or change the guess background
//  for only a second or 2 - then back to normal
//  get new flag automatically on correct guess
// or make it so you can get next flag, display a message correct or not and click new flag?
// MAKE IT MORE OF A GAME - add 3 lives and a score (to the top AFTER clicking flag)
// WHEN CLICK DOWN ON KEYBOARD, SCROLL THROUGH OPTIONS
// ADD CLEAR BUTTON OR CLEAR AFTER CLICKING CHECK
// MAKE HEARTS RED AND BIGGER TEXT AND HEARTS - use lives.length to get game over
// LIMIT # OF LI ITEMS TO 5-8, "AND" BRINGS TOO MANY AND IT FILLS SCREEN
// CHANGE SIZE ON LAPTOP AND TABLET
// STYLE BTNS BETTER - ANIMATE THEM ON CLICK

getFlag.addEventListener("click", getData);

checkFlag.addEventListener("click", checkAnswer);

guessOptions.addEventListener("click", fillInput);

cleatBtn.addEventListener("click", clearInput);

// guessOptions.addEventListener("click", function(e) {
//   guessField.value = e.target.id;
// });