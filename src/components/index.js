import "../pages/index.css";

import {
  addCard,
  createCard,
  renderInitialCards
} from "./card";

import {
  openPopup,
  closePopup, toggleButtonSendingData,
} from './utils'

import {
  enableValidation, hasInvalidField, hasInvalidInputs,
  toggleButtonState,
} from "./validate";

import {
  profileTitle,
  profileSubtitle,
  editProfileForm,
  profileAvatar,
  inputTextEditFormName,
  inputTextEditFormJob,
  addCardForm,
  editAvatarForm,
  inputTextEditAvatarLink,
  popupEditForm,
  popupAddCardForm,
  popupEditAvatar,
  closeButtons,
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
} from "./variables"

import {
  getInitialCards,
  getUserInformation,
  postCardToServer,
  updateAvatar,
  updateUserInformation
} from "./api";

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
  toggleButtonSendingData(false)
  profileTitle.textContent = inputTextEditFormName.value;
  profileSubtitle.textContent = inputTextEditFormJob.value;
  updateUserInformation()
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      closePopup(popupEditForm);
      toggleButtonSendingData(true)
    })
    .catch((error) => {
      console.log(error)
      toggleButtonSendingData(true)
    })
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  toggleButtonSendingData(false)
  postCardToServer()
    .then((userData) => {
      addCard(createCard(userData.name, userData.link, userData.owner._id, userData._id, userData.likes));
      closePopup(popupAddCardForm);
      evt.target.reset();
      toggleButtonSendingData(true)
      toggleButtonState(true, popupAddCardForm, settings)
    })
    .catch((error) => {
      console.log(error)
      toggleButtonSendingData(true)
    })
}

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  toggleButtonSendingData(false)
  profileAvatar.src = inputTextEditAvatarLink.value
  updateAvatar()
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closePopup(popupEditAvatar);
      toggleButtonState(true, editAvatarForm, settings)
      evt.target.reset();
      toggleButtonSendingData(true)
    })
    .catch((error) => {
      console.log(error)
      toggleButtonSendingData(true)
    })
}

getUserInformation()
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;
  }).catch((error) => {
  console.log(error)
})

getInitialCards()
  .then((cards) => {
    renderInitialCards(cards)
  })
  .catch((error) => {
    console.log(error)
  })

enableValidation(settings);

editProfileForm.addEventListener("submit", submitEditProfileForm);
editAvatarForm.addEventListener("submit", submitEditAvatarForm);
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

buttonOpenAvatarEditForm.addEventListener("click", () => {
  openPopup(popupEditAvatar)
})

