function playRight() {
  const right = new Audio("../media/Win.mp3");
  right.play();
}

function playWrong() {
  const wrong = new Audio("../media/Wrong.mp3");
  wrong.play();
}
export { playRight, playWrong };
