import createQuiz from "../components/createQuiz.js";

export default function burgerMenuHandler() {
  const burgerIcon = document.querySelector(".burger-icon");
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerMenuClose = document.querySelector(".burger-menu_close");
  const popup = document.querySelector(".popup");
  const birdList = document.querySelector(".burger-menu__list");
  const birdTypes = document.querySelectorAll(".burger-menu__link");

  burgerIcon.addEventListener("click", () => {
    popup.classList.remove("popup_hidden");
    burgerMenu.classList.remove("show-on-click");
  });

  //hide popup om click
  popup.addEventListener("click", (elem) => {
    if (elem.target === popup) {
      burgerMenu.classList.add("show-on-click");
      popup.classList.add("popup_hidden");
    }
  });
  //close burger with closeIcon
  burgerMenuClose.addEventListener("click", () => {
    burgerMenu.classList.add("show-on-click");
    popup.classList.add("popup_hidden");
  });

  //return selected type of birds
  let selectedTypeBirds = "";
  birdList.addEventListener("click", (birdClick) => {
    //delete active status
    birdTypes.forEach((bird) => {
      bird.classList.remove("burger-menu__link_active");
    });
    birdTypes.forEach((bird) => {
      if (birdClick.target === bird) {
        bird.classList.add("burger-menu__link_active");
        selectedTypeBirds = bird.getAttribute("type-bird").replace("-birds", "");
        burgerMenu.classList.add("show-on-click");
        popup.classList.add("popup_hidden");
        createQuiz(selectedTypeBirds);
      }
    });
  });
  return selectedTypeBirds;
}

// console.log(selectedTypeBirds);
