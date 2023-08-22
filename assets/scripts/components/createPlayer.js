import birdsData from "../data/birds.js";

export default async function createAudioPlayer() {
  const playIcon = document.querySelector(".play-icon");
  const pauseIcon = document.querySelector(".pause-icon");
  const playPauseBlock = document.querySelector(".play-pause_icon");
  const volumeIconBox = document.querySelector(".volume-icon");
  const volumeIconOn = document.querySelector(".volume-icon_on");
  const volumeIconOff = document.querySelector(".volume-icon_off");

  playPauseBlock.addEventListener("click", () => {
    playIcon.classList.toggle("hidden-icon");
    pauseIcon.classList.toggle("hidden-icon");
  });
  volumeIconBox.addEventListener("click", () => {
    volumeIconOn.classList.toggle("hidden-icon");
    volumeIconOff.classList.toggle("hidden-icon");
  });
  console.log(playPauseBlock);
}
