import {closeByEscape} from "./modal";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByEscape)
}

export {openPopup, closePopup};
