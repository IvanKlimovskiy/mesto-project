import "../pages/index.css";
import {
  addCard,
  createCard,
  renderInitialCards
} from "./card";
import {
  openPopup,
  closePopup,
} from './utils'
import {
  popupEditForm,
  popupAddCardForm,
  popupImage,
  buttonClosePopupImage,
  buttonCloseEditForm,
  buttonCloseAddCardForm,
  buttonOpenEditForm,
  buttonOpenAddCard,
} from "./modal";

import {
  enableValidation,
  buttonState,
} from "./validate";

import {
  profileTitle,
  profileSubtitle,
  editProfileForm,
  inputTextEditFormName,
  inputTextEditFormJob,
  addCardForm,
  inputTextAddCardName,
  inputTextAddCardLink
} from "./variables"

export const settings = {
  formElement: '.edit-form',
  inputElement: '.edit-form__input-text',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_disabled',
  inputErrorClass: 'edit-form__input-text_type_error',
  errorClass: '.edit-form__input-error'
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTextEditFormName.value;
  profileSubtitle.textContent = inputTextEditFormJob.value;
  closePopup(popupEditForm);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCard(inputTextAddCardName.value, inputTextAddCardLink.value));
  evt.target.reset();
  closePopup(popupAddCardForm);
  buttonState(true, popupAddCardForm, settings)
}

renderInitialCards();

enableValidation(settings);

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardForm.addEventListener("submit", submitAddCardForm);

buttonCloseEditForm.addEventListener("click", () => {
  closePopup(popupEditForm);
});

buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCardForm);
});

buttonOpenEditForm.addEventListener("click", () => {
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
});

buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCardForm);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});
