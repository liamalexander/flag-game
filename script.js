const getFlag = document.querySelector(".get-flag");
const nameCountry = document.querySelector(".name");
const flag = document.querySelector(".flag");
const guessField = document.querySelector(".guess");
const checkFlag = document.querySelector(".check-flag");
const guessOptions = document.querySelector(".guess-options");

let randomNumber;
let data;

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
};

const checkAnswer = function () {
  // console.log(guessField.value);
  // console.log(data[randomNumber].name.common.toLowerCase());
  // console.log(randomNumber);
  if (guessField.value.toLowerCase() == data[randomNumber].name.common.toLowerCase()) {
    guessField.style.background = "green";
  } else {
    guessField.style.background = "red";
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

guessField.addEventListener("keyup", filterCountries);

// ADD A CORRECT / INCORRECT DISPLAY AND REMOVE THE COLOURS IN BACKGROUND - animation that all screen goes
//  green or red for a second or so...from top to bottom or left to right?
// STYLE IT NICER - ADD A NEW FONT FROM GOOGLE
// MAKE IT MORE OF A GAME
// ADD CLEAR BUTTON OR CLEAR AFTER CLICKING CHECK
// LIMIT # OF LI ITEMS TO 5-8, "AND" BRINGS TOO MANY AND IT FILLS SCREEN
// CHANGE SIZE ON LAPTOP AND TABLET
// STYLE BTNS BETTER - BLUE - BORDER RADIUS ETC
// ADD BORDER-RADIUS TO LEFT OF INPUT AND RIGHT OF CHECK BUTTON - MAKE BOTH BIGGER? - AND BIGGER FONT?

getFlag.addEventListener("click", getData);

checkFlag.addEventListener("click", checkAnswer);

guessOptions.addEventListener("click", fillInput);

// guessOptions.addEventListener("click", function(e) {
//   guessField.value = e.target.id;
// });