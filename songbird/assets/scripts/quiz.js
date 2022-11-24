import birdsData from "../scripts/data/birds.js";
import burgerHandlerQuiz from "../scripts/components/burgerHandlerQuiz.js";
import createQuiz from "../scripts/components/createQuiz.js";

const buttonGoStart = document.querySelector(".return-start__button");
//transfer to start page
buttonGoStart.addEventListener("click", () => {
  window.location.href = "../../index.html";
});
// console.log("Приложение немного изменено, не в соответствии с демо. Викторина играется");
// console.log(
//   "только в одном подвиде птиц - чтобы лучше их запоминать. В итоге при нажатии NextLevel мы остаемся в том же подвиде, и после того, как прошли всех птиц, мы выводим результат на странице с результатами. При выборе блока ПРОБНЫЙ счет за ответы также начисляется, просто нет конкретного выбранного подвида"
// );

//select type birds
// burgerHandlerQuiz();
createQuiz();
