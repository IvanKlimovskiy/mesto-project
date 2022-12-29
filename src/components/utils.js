import {closeByEscape} from "./modal";
import {buttonsSubmitForm} from "./variables";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByEscape)
}

function toggleButtonSendingData(isSent) {
  buttonsSubmitForm.forEach((button) => {
    if (isSent) {
      button.textContent = "Сохранить"
      button.disabled = false
    } else {
      button.textContent = "Сохранение..."
      button.disabled = true
    }
  })
}

export {openPopup, closePopup, toggleButtonSendingData};
