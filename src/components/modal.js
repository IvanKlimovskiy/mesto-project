import {closePopup} from './utils'

const closeButtons = Array.from(document.querySelectorAll(".popup__close-button"));
const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const popupEditForm = document.querySelector(".popup_edit-form");
const popupAddCardForm = document.querySelector(".popup_add-card-form");
const popupImage = document.querySelector(".popup_image");

const popupList = Array.from(document.querySelectorAll(".popup"));

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
  popupAddCardForm,
  popupImage,
  popupEditForm,
  buttonOpenEditForm,
  buttonOpenAddCard,
  closeButtons,
  closeByEscape
};
