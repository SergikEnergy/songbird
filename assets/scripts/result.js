const gameResult = document.querySelector(".result-game");
const gameResultValue = localStorage.getItem("resultQuiz");

gameResult.innerHTML = gameResultValue;

const buttonReturn = document.querySelector(".return-start__button");
buttonReturn.addEventListener("click", () => {
  window.location.href = "./quiz.html";
});
