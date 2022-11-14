import birdsData from "./assets/scripts/data/birds.js";
import createSample from "./assets/scripts/components/createSample.js";
import createPlayer from "./assets/scripts/components/createPlayer.js";
import closeRules from "./assets/scripts/components/closeRules.js";
import burgerMenuHandler from "./assets/scripts/components/burgerHandler.js";

//transfer to quiz page
const buttonStartQuiz = document.querySelector(".start-game__button");

buttonStartQuiz.addEventListener("click", () => {
  window.location.href = "./assets/pages/quiz.html";
});

//popUp with Rules close on click
closeRules();
const birdList = document.querySelector(".bird-list");
const birdTypes = document.querySelectorAll(".bird-list__link");
birdList.addEventListener("click", (birdClick) => {
  //delete active status
  birdTypes.forEach((bird) => {
    bird.classList.remove("bird-list__link_active");
  });
  //return selected type
  birdTypes.forEach((bird) => {
    if (birdClick.target === bird) {
      bird.classList.add("bird-list__link_active");
      selectedTypeBirds = bird.getAttribute("type-bird").replace("-birds", "");
      console.log(selectedTypeBirds);

      // createSample(selectedTypeBirds);
    }
  });
});

burgerMenuHandler();

//select type birds

// await createPlayer();
