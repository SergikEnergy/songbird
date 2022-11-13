import birdsData from "../scripts/data/birds.js";
import createSample from "../scripts/components/createSample.js";
import createPlayer from "../scripts/components/createPlayer.js";

// console.log(birdsData[0]);
const buttonGoStart = document.querySelector(".return-start__button");
//transfer to start page
buttonGoStart.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

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

// await createPlayer();
