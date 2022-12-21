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
  closeButtons,
  buttonOpenEditForm,
  buttonOpenAddCard,
} from "./modal";

import {
  enableValidation, hasInvalidField, hasInvalidInputs,
  toggleButtonState,
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
  toggleButtonState(true, popupAddCardForm, settings)
}

renderInitialCards();

enableValidation(settings);

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardForm.addEventListener("submit", submitAddCardForm);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup")
  button.addEventListener("click", () => {
    closePopup(popup)
  })
})

buttonOpenEditForm.addEventListener("click", () => {
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
  openPopup(popupEditForm);
  // Функция для проверки валидности полей при открытии попапа. Без этой функции при удалении из попапа,
  // редактировния профиля, любого поля без сохранения, при повторном открытии несмотря на заполненные поля
  // кнопка сохранить будет неактивна и будет отображаться текст с ошибкой.
  const popupInputs = Array.from(editProfileForm.querySelectorAll(".edit-form__input-text"))
  popupInputs.forEach((popupInput) => {
    hasInvalidField(editProfileForm, popupInput, settings)
    toggleButtonState(hasInvalidInputs(popupInputs), popupEditForm, settings)
  })
});

buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCardForm);
});
