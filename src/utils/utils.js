import {
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
  buttonOpenEditForm,
  buttonsSubmitForm,
  editProfileForm,
  inputTextEditFormJob,
  inputTextEditFormName,
  profileSubtitle,
  profileTitle
} from "./variables";

import {hasInvalidField, hasInvalidInputs, toggleButtonState} from "../components/FormValidator";
import {popupEditForm, popupAddCardForm, popupEditAvatar, settings} from "../pages/index"

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

buttonOpenEditForm.addEventListener("click", () => {
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
  popupEditForm.open();
  // Функция для проверки валидности полей при открытии попапа. Без этой функции при удалении из попапа,
  // редактировния профиля, любого поля без сохранения, при повторном открытии несмотря на заполненные поля
  // кнопка сохранить будет неактивна и будет отображаться текст с ошибкой.
  const popupInputs = Array.from(editProfileForm.querySelectorAll(".edit-form__input-text"));
  popupInputs.forEach((popupInput) => {
    hasInvalidField(editProfileForm, popupInput, settings);
    toggleButtonState(hasInvalidInputs(popupInputs), editProfileForm, settings);
  });
});

buttonOpenAddCard.addEventListener("click", () => {
  popupAddCardForm.open();
});

buttonOpenAvatarEditForm.addEventListener("click", () => {
  popupEditAvatar.open();
});


export {toggleButtonSendingData};
