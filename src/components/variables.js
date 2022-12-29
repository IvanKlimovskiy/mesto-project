const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector('.profile__avatar')
const editProfileForm = document.querySelector(".edit-form");
const editAvatarForm = document.querySelector(".edit-avatar-form")
const inputTextEditFormName = document.querySelector(".edit-form__input-text-name");
const inputTextEditFormJob = document.querySelector(".edit-form__input-text-job");
const addCardForm = document.querySelector(".add-card-form");
const inputTextAddCardName = document.querySelector(".add-card-form__input-text-card-name");
const inputTextAddCardLink = document.querySelector(".add-card-form__input-text-link");
const inputTextEditAvatarLink = document.querySelector(".edit-avatar-form__input-text-link")
const buttonsSubmitForm = Array.from(document.querySelectorAll(".edit-form__button"))
const closeButtons = Array.from(document.querySelectorAll(".popup__close-button"));
const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonOpenAvatarEditForm = document.querySelector(".profile__avatar-wrapper")
const popupEditForm = document.querySelector(".popup_edit-form");
const popupAddCardForm = document.querySelector(".popup_add-card-form");
const popupImage = document.querySelector(".popup_image");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const popupList = Array.from(document.querySelectorAll(".popup"));
const elementTemplate = document.querySelector(".template").content;
const popupOpenedImage = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title");
const elementsBlock = document.querySelector(".elements");
const myId = '5fd43d4214a884362d7366eb';

export {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  editProfileForm,
  editAvatarForm,
  inputTextEditFormName,
  inputTextEditFormJob,
  inputTextEditAvatarLink,
  addCardForm,
  inputTextAddCardName,
  buttonsSubmitForm,
  inputTextAddCardLink,
  popupAddCardForm,
  popupImage,
  popupEditForm,
  popupEditAvatar,
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
  closeButtons,
  popupList,
  elementTemplate,
  popupOpenedImage,
  imageTitle,
  elementsBlock,
  myId
}
