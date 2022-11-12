import birdsData from "./assets/scripts/data/birds.js";
import createSample from "./assets/scripts/components/createSample.js";
import createPlayer from "./assets/scripts/components/createPlayer.js";

// console.log(birdsData[0]);
const buttonStartQuiz = document.querySelector(".start-game__button");
//transfer to quiz page
buttonStartQuiz.addEventListener("click", () => {
  window.location.href = "./assets/pages/quiz.html";
});

//popUp with Rules close on click
function closeRules() {
  const closePopupRules = document.querySelector(".rules-title__close");
  const popupRules = document.querySelector(".rules-popup");
  closePopupRules.addEventListener("click", () => {
    popupRules.classList.add("rules-popup_hidden");
  });
  popupRules.addEventListener("click", (elem) => {
    if (elem.target === popupRules) popupRules.classList.add("rules-popup_hidden");
  });
}

closeRules();
//select type birds
const birdList = document.querySelector(".bird-list");
const birdTypes = document.querySelectorAll(".bird-list__link");
let selectedTypeBirds = "";
birdList.addEventListener("click", (birdClick) => {
  birdTypes.forEach((bird) => {
    if (birdClick.target === bird) {
      selectedTypeBirds = bird.getAttribute("type-bird").replace("-birds", "");
      console.log(selectedTypeBirds);
      createSample(selectedTypeBirds);
    }
  });
});
await createPlayer();
