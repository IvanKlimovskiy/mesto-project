import "../pages/index.css";
import {
  submitEditProfileForm, renderInitialCards,
} from "./card";
import {submitAddCardForm} from './utils'
import {
  openPopup,
  closePopup,
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
  editProfileForm,
  addCardForm,
  profileTitle,
  profileSubtitle,
  inputTextEditFormName,
  inputTextEditFormJob,
  enableValidation,
} from "./validate";

renderInitialCards();

export const config = {
  formElement: '.edit-form',
  inputElement: '.edit-form__input-text',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_disabled',
  inputErrorClass: 'edit-form__input-text_type_error',
  errorClass: '.edit-form__input-error'
}

enableValidation();

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardForm.addEventListener("submit", submitAddCardForm);

buttonCloseEditForm.addEventListener("click", () => {
  closePopup(popupEditForm);
});

buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCardForm);
});

buttonOpenEditForm.addEventListener("click", () => {
  openPopup(popupEditForm);
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
});

buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCardForm);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});
