const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector('.profile__avatar')
const editProfileForm = document.querySelector(".edit-form");
const editAvatarForm = document.querySelector(".edit-avatar-form")
const inputTextEditFormName = document.querySelector(".edit-form__input-text-name");
const inputTextEditFormJob = document.querySelector(".edit-form__input-text-job");
const addCardForm = document.querySelector(".add-card-form");
const buttonsSubmitForm = Array.from(document.querySelectorAll(".edit-form__button"))
const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonOpenAvatarEditForm = document.querySelector(".profile__avatar-wrapper")
const elementsBlock = document.querySelector(".elements");

export {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  editProfileForm,
  editAvatarForm,
  inputTextEditFormName,
  inputTextEditFormJob,
  addCardForm,
  buttonsSubmitForm,
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
  elementsBlock,
}
