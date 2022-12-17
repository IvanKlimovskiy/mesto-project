const buttonCloseEditForm = document.querySelector(".edit-form__close-button");
const buttonCloseAddCardForm = document.querySelector(
  ".add-card-form__close-button"
);
const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonClosePopupImage = document.querySelector(".popup__close-button");
const popupEditForm = document.querySelector(".popup_edit-form");
const popupAddCardForm = document.querySelector(".popup_add-card-form");
const popupImage = document.querySelector(".popup_image");
const popupOpenedImage = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export {
  openPopup,
  closePopup,
  popupAddCardForm,
  popupImage,
  popupEditForm,
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonClosePopupImage,
  popupOpenedImage,
  imageTitle,
  buttonCloseEditForm,
  buttonCloseAddCardForm,
};
