import birdsData from "../data/birds.js";
import { playWrong, playRight } from "./audio.js";

export default function createQuiz(selectType) {
  let birds = "";
  let selectTypeRu = "";
  if (selectType === "train") {
    birds = birdsData[0];
    selectTypeRu = "пробный";
  } else if (selectType === "sparrow") {
    birds = birdsData[1];
    selectTypeRu = "воробьиные";
  } else if (selectType === "wild") {
    birds = birdsData[2];
    selectTypeRu = "лесные";
  } else if (selectType === "vocal") {
    birds = birdsData[3];
    selectTypeRu = "поющие";
  } else if (selectType === "predator") {
    birds = birdsData[4];
    selectTypeRu = "хищные";
  } else {
    birds = birdsData[5]; //sea
    selectTypeRu = "морские";
  }

  const birdTitle = document.querySelector(".quiz__title");
  if (selectType !== "train") {
    birdTitle.innerHTML = `Вы выбрали подвид \"${selectTypeRu}\".`;
  } else if (selectType === "train") {
    birdTitle.innerHTML = `Вы выбрали блок \"${selectTypeRu}\". Здесь содержатся вопросы без привязки к подвиду птиц.`;
  }
  //set disabled style for next button
  let nextBirdButton = document.querySelector(".next__question_button");
  if (!nextBirdButton.classList.contains("button_disabled")) nextBirdButton.classList.add("button_disabled");
  // get random array of birds
  function getRandomBird() {
    let randomArray = [];
    for (let i = 0; i < birds.length; i++) {
      randomArray.push(i);
    }
    randomArray.sort(() => Math.random() - 0.5);
    return randomArray;
  }
  let rightAnswer, rightImgSrc, audioTask;
  let index = getRandomBird();

  //if right change this elements
  const questionName = document.querySelector(".question__answer");
  const questionImage = document.querySelector(".question__img_bg");

  createBlockQuestion();
  function createBlockQuestion(item = 0) {
    questionImage.src = "../img/BG-bird.jpg";
    questionName.innerHTML = "* * * * * * *";

    const questionPlayer = document.querySelector(".question__player");
    let audioQuestion = document.createElement("audio");
    audioTask = audioQuestion;
    audioQuestion.classList.add("question__player__audio", "audio-player");
    audioQuestion.setAttribute("controls", "controls");
    audioQuestion.innerHTML = `
    <source src="${birds[index[item]].audio}" type="audio/mpeg">
  `;
    let playerExist = document.querySelector(".question__player__audio");
    if (playerExist) playerExist.remove();

    questionPlayer.append(audioQuestion);
    rightAnswer = birds[index[item]].name;
    rightImgSrc = birds[index[item]].image;
  }
  //variants of answer

  createVariants();
  function createVariants(item = 0) {
    const variantsList = document.querySelectorAll(".list__radio_label");
    const shuffleArray = getRandomBird();

    let variantsContent = [];
    for (let i = 0; i < birds.length; i++) {
      variantsContent.push(birds[shuffleArray[i]]);
    }
    let countVariants = 0;
    variantsList.forEach((elem) => {
      elem.innerHTML = variantsContent[countVariants].name;
      countVariants++;
    });
  }
  //handler click on answer
  answerElementShow();
  function answerElementShow() {
    // const answers = document.querySelectorAll(".answers-list__item");
    const answersBox = document.querySelector(".quiz-box__variants");
    const radioButtons = document.querySelectorAll(".list__radio_input");
    const variantsList = document.querySelectorAll(".list__radio_label");
    //delete styles radiobutton if exist
    radioButtons.forEach((itemRadio) => {
      if (itemRadio.classList.contains("wrong_answer") || itemRadio.classList.contains("right_answer")) {
        itemRadio.classList.remove("wrong_answer", "right_answer");
      }
    });

    answersBox.addEventListener("click", function createAnswerDescription(clickedElem) {
      // console.log(clickedElem.target);
      let birdName = "";
      radioButtons.forEach((elem) => {
        if (clickedElem.target === elem) {
          const elemId = elem.getAttribute("id");

          // console.log(elem);

          for (let i = 0; i < variantsList.length; i++) {
            if (variantsList[i].getAttribute("for") === elemId) {
              birdName = variantsList[i].innerHTML;
            }
          }

          let currentIndex;
          //find index selected answer in index array
          for (let i = 0; i < index.length; i++) {
            if (birdName === birds[i].name) currentIndex = i;
          }
          // console.log(birds[currentIndex]);

          //create answer info
          const infoImage = document.querySelector(".bird-info__picture_img");
          infoImage.src = birds[currentIndex].image;
          const infoNameRu = document.querySelector(".name_ru");
          infoNameRu.innerHTML = birds[currentIndex].name;
          const infoNameEng = document.querySelector(".name_en");
          infoNameEng.innerHTML = birds[currentIndex].species;

          //replace default text and show hidden info
          let defaultInfo = document.querySelector(".default-description");
          defaultInfo.innerHTML = birds[currentIndex].description;
          let showDescription = document.querySelector(".bird-info__box");
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

          /*block for wrong and right answer*/
          if (birdName === rightAnswer) {
            elem.classList.add("right_answer");
            playRight();
            audioTask.pause();
            answersBox.removeEventListener("click", createAnswerDescription);
            questionName.innerHTML = rightAnswer;
            questionImage.src = rightImgSrc;
            nextBirdButton.classList.remove("button_disabled");
          } else {
            elem.classList.add("wrong_answer");
            playWrong();
          }
        }
      });
    });
  }

  //handler for the next bird

  // nextBirdButton.classList.remove("button_disabled");

  nextBirdQuiz();
  function nextBirdQuiz(startClick = 0) {
    let countClick = startClick;

    nextBirdButton.addEventListener("click", click);
    function click() {
      if (countClick < index.length - 1) {
        createBlockQuestion(countClick + 1);
        createVariants();
        answerElementShow();
        countClick++;
      } else {
        nextBirdButton.classList.remove("button_disabled");
        nextBirdButton.removeEventListener("click", click);
      }
      console.log(countClick);
    }
  }
}
