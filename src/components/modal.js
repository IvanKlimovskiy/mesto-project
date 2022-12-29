import {closePopup} from './utils'
import {popupList} from "./variables";

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  })
})

export {
  closeByEscape
};
