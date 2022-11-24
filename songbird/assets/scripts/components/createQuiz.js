import birdsData from "../data/birds.js";
import { playWrong, playRight } from "./audio.js";

export default function createQuiz(indexBirds = 0) {
  const birdList = document.querySelector(".bird-list");
  const birdTypes = document.querySelectorAll(".bird-list__link");
  let nextBirdButton = document.querySelector(".next__question_button");
  let birds = birdsData[indexBirds];

  const answersBox = document.querySelector(".quiz-box__variants");
  const birdTitle = document.querySelector(".quiz__title");
  const kindOfBirds = ["Пробный", "Воробьиные", "Лесные", "Певчие", "Хищные", "Морские"];

  let indexKind = 0;
  changeTitle(kindOfBirds[indexKind]);
  function changeTitle(select) {
    birdTitle.innerHTML = `В игре блок \"${select}\".`;
  }

  //set disabled style for next button
  let isAnswered = true;
  const scoreShow = document.querySelector(".score__content_value");
  let score = 5;
  let previousScore = 0;
  let resultGame = 0;
  scoreShow.innerHTML = "00";

  // get random array of birds
  let indexRandom;
  indexRandom = getRandomNumber();
  function getRandomNumber(min = 0, max = birds.length) {
    let num = Math.floor(Math.random() * max + min);
    return num;
  }
  let rightAnswer = "",
    rightImgSrc = "",
    audioTask;

  setRightAnswer();
  function setRightAnswer(item = indexRandom) {
    rightAnswer = birds[item].name;
    rightImgSrc = birds[item].image;
    console.log(birds[item]);
  }
  //if right change this elements
  const questionName = document.querySelector(".question__answer");
  const questionImage = document.querySelector(".question__img_bg");

  const infoImage = document.querySelector(".bird-info__picture_img");
  const infoNameRu = document.querySelector(".name_ru");
  const infoNameEng = document.querySelector(".name_en");
  const defaultInfo = document.querySelector(".default-description");
  const showDescription = document.querySelector(".bird-info__box");

  createBlockQuestion(indexRandom);
  function createBlockQuestion(index) {
    //apply default value for quiz
    questionImage.src = "../img/BG-bird.jpg";
    questionName.innerHTML = "* * * * * * *";
    infoImage.src = "../img/BG-bird.jpg";
    showDescription.classList.add("hidden-info");
    defaultInfo.innerHTML = `Выберите вариант ответа. При выборе варианта ответа в данном блоке появится краткая информация о выбранной птице, а также
    аудиоплеер, где можно послушать её голос.`;

    const questionPlayer = document.querySelector(".question__player");
    let audioQuestion = document.createElement("audio");
    audioTask = audioQuestion;
    audioQuestion.classList.add("question__player__audio", "audio-player");
    audioQuestion.setAttribute("controls", "controls");
    audioQuestion.innerHTML = `
    <source src="${birds[index].audio}" type="audio/mpeg">
  `;
    let playerExist = document.querySelector(".question__player__audio");
    if (playerExist) playerExist.remove();

    questionPlayer.append(audioQuestion);

    console.log("rightAnswer - - -", rightAnswer);
  }
  // //variants of answer
  function getRandomArray() {
    let array = [];
    for (let i = 0; i < birds.length; i++) {
      array.push(i);
    }
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  const variantsList = document.querySelectorAll(".list__radio_label");

  createVariants();
  function createVariants() {
    // get shuffle variants
    let variantsContent = getRandomArray();
    let indexVariants = 0;
    variantsList.forEach((elem) => {
      elem.innerHTML = birds[variantsContent[indexVariants]].name;
      indexVariants++;
    });
  }

  //handler click on answer
  const radioButtons = document.querySelectorAll(".list__radio_input");
  //delete styles radiobutton if exist
  function defaultRadioButtonStyle() {
    radioButtons.forEach((itemRadio) => {
      if (itemRadio.classList.contains("wrong_answer") || itemRadio.classList.contains("right_answer")) {
        itemRadio.classList.remove("wrong_answer", "right_answer");
      }
      itemRadio.removeAttribute("checked");
    });
  }
  defaultRadioButtonStyle();

  answersBox.addEventListener("click", createAnswerDescription);
  answersBox.addEventListener("click", checkAnswer);
  function createAnswerDescription(clickedElem) {
    // console.log(clickedElem.target);
    console.log(clickedElem);
    let birdName = "";

    radioButtons.forEach((elem) => {
      if (clickedElem.target === elem) {
        const elemId = elem.getAttribute("id");

        //get clicked Name from button
        for (let i = 0; i < variantsList.length; i++) {
          if (variantsList[i].getAttribute("for") === elemId) {
            birdName = variantsList[i].innerHTML;
          }
        }

        let currentIndex;
        //find index selected answer in birds objects
        for (let i = 0; i < variantsList.length; i++) {
          if (birdName === birds[i].name) {
            currentIndex = i;
          }
        }

        showVariantsBox();

        //create answer info
        function showVariantsBox() {
          infoImage.setAttribute("src", birds[currentIndex].image);
          // console.log(birds[currentIndex], currentIndex);
          infoNameRu.innerHTML = birds[currentIndex].name;
          infoNameEng.innerHTML = birds[currentIndex].species;

          //replace default text and show hidden info
          // let defaultInfo = document.querySelector(".default-description");
          defaultInfo.innerHTML = birds[currentIndex].description;
          // let showDescription = document.querySelector(".bird-info__box");
          showDescription.classList.remove("hidden-info");
          //create player
          const infoPlayerBox = document.querySelector(".answer-info__player");
          let audioPlayerInfo = document.createElement("audio");
          audioPlayerInfo.classList.add("answer-info__player__audio", "audio-player");
          audioPlayerInfo.setAttribute("controls", "controls");
          audioPlayerInfo.innerHTML = `
                  <source src="${birds[currentIndex].audio}" type="audio/mpeg">
                `;
          let playerExist = document.querySelector(".answer-info__player__audio");
          if (playerExist) playerExist.remove();
          infoPlayerBox.append(audioPlayerInfo);
        }
      }
    });
  }
  function checkEqualBirds(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].name !== arr2[i].name) return false;
      else return true;
    }
  }

  function checkAnswer(clickedElem) {
    let birdName = "";

    radioButtons.forEach((elem) => {
      if (clickedElem.target === elem) {
        const elemId = elem.getAttribute("id");

        //get clicked Name from button
        for (let i = 0; i < variantsList.length; i++) {
          if (variantsList[i].getAttribute("for") === elemId) {
            birdName = variantsList[i].innerHTML;
          }
        }
        console.log(checkEqualBirds(birds, birdsData[birdsData.length - 1]));
        console.log(birds);
        console.log(birdsData[birdsData.length - 1]);
        /*block for wrong and right answer compare*/

        if (birdName === rightAnswer) {
          // console.log("right - - -", birdName);
          elem.classList.add("right_answer");
          playRight();
          previousScore = Number(scoreShow.innerHTML);
          scoreShow.innerHTML = `${score + previousScore}`;
          audioTask.pause();
          questionName.innerHTML = rightAnswer;
          questionImage.src = rightImgSrc;
          nextBirdButton.classList.remove("button_disabled");
          //end game
          if (checkEqualBirds(birds, birdsData[birdsData.length - 1])) {
            resultGame = Number(scoreShow.innerHTML);
            //safe result in local storage
            localStorage.setItem("resultQuiz", resultGame);
            //transfer to result page
            window.location.href = "./result.html";
          }
          //next level
          if (!nextBirdButton.classList.contains("button_disabled")) {
            nextLevel();
          }
          answersBox.removeEventListener("click", checkAnswer);
        } else if (birdName !== rightAnswer) {
          // console.log("wrong ---", birdName);
          // console.log("rightAnswer", rightAnswer);
          elem.classList.add("wrong_answer");
          playWrong();
          score--;
        }
      }
    });
  }

  //handler for the next bird
  let countUse = 1;
  function nextLevel() {
    //delete active status
    // let countClick = startClick;
    score = 5;
    nextBirdButton.addEventListener("click", click);
    function click() {
      nextBirdButton.classList.add("button_disabled");
      //change styles birdtypes
      let nextTypeIndex;
      for (let i = 0; i < birdTypes.length; i++) {
        if (birdTypes[i].classList.contains("bird-list__link_active")) {
          birdTypes[i].classList.remove("bird-list__link_active");
          if (birdTypes[i + 1]) {
            nextTypeIndex = i + 1;
          }
        }
      }
      birdTypes[nextTypeIndex].classList.add("bird-list__link_active");
      birds = birdsData[countUse];
      changeTitle(kindOfBirds[indexKind + countUse]);

      let nextIndexRandom = getRandomNumber();
      setRightAnswer(nextIndexRandom);
      createBlockQuestion(nextIndexRandom);
      createVariants();
      defaultRadioButtonStyle();
      answersBox.addEventListener("click", checkAnswer);

      countUse++;
      nextBirdButton.removeEventListener("click", click);
    }
  }
}
