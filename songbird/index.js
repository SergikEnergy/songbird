import birdsData from "./assets/scripts/data/birds.js";
import closeRules from "./assets/scripts/components/closeRules.js";
import burgerMenuHandler from "./assets/scripts/components/burgerHandler.js";
import getTypeBird from "./assets/scripts/components/getTypeBird.js";

//transfer to quiz page
const buttonStartQuiz = document.querySelector(".start-game__button");

buttonStartQuiz.addEventListener("click", () => {
  window.location.href = "./assets/pages/quiz.html";
});

closeRules();
burgerMenuHandler();
getTypeBird();

// console.log(select);
