import birdsData from "../data/birds.js";

export default function createSample(selectType) {
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

  // get random array of birds or random number
  const birdTitle = document.querySelector(".quiz-sample__title");
  birdTitle.innerHTML = `Вы выбрали подвид \"${selectTypeRu}\"`;

  function getRandom(min = 0, max = 6) {
    let num = Math.floor(Math.random() * max + min);
    return num;
  }
  function getRandomBird() {
    let randomArray = [];
    for (let i = 0; i < birds.length; i++) {
      randomArray.push(i);
    }
    randomArray.sort(() => Math.random() - 0.5);
    return randomArray;
  }
  let index = getRandomBird();
  createBlockBird();
  function createBlockBird(item = 0) {
    const birdNameRu = document.querySelector(".bird-figure__content__name-ru");
    const birdNameEn = document.querySelector(".bird-figure__content__name-eng");
    const birdDescription = document.querySelector(".quiz-sample__content_description");
    const birdFigureContent = document.querySelector(".bird-figure__content");
    const birdImage = document.querySelector(".bird-figure__img_sample");

    birdNameEn.innerHTML = birds[index[item]].name;
    birdNameRu.innerHTML = birds[index[item]].species;
    birdDescription.innerHTML = birds[index[item]].description;
    birdImage.src = birds[index[item]].image;
    let audioSample = document.createElement("audio");
    audioSample.classList.add("bird-figure__content__audio", "audio-player");
    audioSample.setAttribute("controls", "controls");
    audioSample.innerHTML = `
    <source src="${birds[index[item]].audio}" type="audio/mpeg">
  `;
    let playerExist = document.querySelector(".bird-figure__content__audio");
    if (playerExist) playerExist.remove();

    birdFigureContent.append(audioSample);
  }
  //handler for the next bird
  let nextBirdButton = document.querySelector(".quiz-sample__next_button");
  nextBirdButton.classList.remove("button_disabled");

  nextSampleBird();
  function nextSampleBird(startClick = 0) {
    let countClick = startClick;
    nextBirdButton.addEventListener("click", click);
    function click() {
      if (countClick < index.length - 1) {
        createBlockBird(countClick + 1);
        countClick++;
      } else {
        nextBirdButton.classList.add("button_disabled");
        nextBirdButton.removeEventListener("click", click);
      }
      console.log(countClick);
    }
  }
}
