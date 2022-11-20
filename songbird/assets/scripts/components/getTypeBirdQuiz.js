import createQuiz from "../components/createQuiz.js";

export default function getTypeBird() {
  const birdList = document.querySelector(".bird-list");
  const birdTypes = document.querySelectorAll(".bird-list__link");
  let selectedTypeBirds = "";
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
        createQuiz(selectedTypeBirds);
      }
    });
  });
}
