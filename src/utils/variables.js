const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonOpenAvatarEditForm = document.querySelector(".profile__avatar-wrapper")

export const validationConfig = {
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
}

export const userProfileSelectors = {
  profileName: '.profile__title',
  profileJob: '.profile__subtitle',
  profileAvatar: '.profile__avatar'
}

export {
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
}
