export default function closeRules() {
  const closePopupRules = document.querySelector(".rules-title__close");
  const popup = document.querySelector(".popup");
  const popupRules = document.querySelector(".rules__window");
  closePopupRules.addEventListener("click", () => {
    popupRules.classList.add("rules_hidden");
    popup.classList.add("popup_hidden");
  });
  popup.addEventListener("click", (elem) => {
    if (elem.target === popup) {
      popupRules.classList.add("rules_hidden");
      popup.classList.add("popup_hidden");
    }
  });
}
