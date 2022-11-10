import birdsData from "./assets/scripts/data/birds.js";

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
//closeRules();
