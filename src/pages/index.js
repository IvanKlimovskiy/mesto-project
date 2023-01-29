import "./index.css";
import PopupWithForm from "../components/PopupWithForm";
import Card from "../components/Card";
import Api from "../components/Api";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  buttonOpenEditForm,
  inputTextEditFormName,
  inputTextEditFormJob,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
} from "../utils/variables";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18",
  headers: {
    authorization: "73a65b3f-f1cb-4973-9fdd-42c64f95341a",
    "Content-Type": "application/json",
  },
});

const editForm = new FormValidator({
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
  errorClass: ".edit-form__input-error"
}, ".edit-form")

const addCardForm = new FormValidator({
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
  errorClass: ".edit-form__input-error"
}, ".add-card-form")

const editAvatar = new FormValidator({
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
  errorClass: ".edit-form__input-error"
}, ".edit-avatar-form")

editForm.enableValidation();
addCardForm.enableValidation();
editAvatar.enableValidation();

export const popupOpenedImage = new PopupWithImage(".popup_image");
popupOpenedImage.setEventListeners();

const popupEditForm = new PopupWithForm(
  ".popup_edit-form",
  (inputValues) => {
    editForm.toggleButtonSendingData(false);
    api.updateUserInformation(inputValues.name, inputValues.job)
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        popupEditForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editForm.toggleButtonSendingData(true);
      });
  }
);

export const popupAddCardForm = new PopupWithForm(
  ".popup_add-card-form",
  (inputValues) => {
    toggleButtonSendingData(false);
    api
      .postCardToServer(inputValues.name, inputValues.link)
      .then((userData) => {
        const newCard = new Card(
          userData,
          userData.owner._id,
          ".template",
          (cardId) => {
            return api.addLikeToCard(cardId);
          },
          (cardId) => {
            return api.removeLikeFromCard(cardId);
          },
          (cardId) => {
            return api.deleteCardFromServer(cardId);
          },
          (cardName, imageLink) => {
            popupOpenedImage.open(cardName, imageLink);
          }
        );
        const cardRenderer = new Section({
          items: []
        }, ".elements")
        cardRenderer.addItem(newCard.generate())
        popupAddCardForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        addCardForm.toggleButtonSendingData(true);
      });
  }
);

export const popupEditAvatar = new PopupWithForm(
  ".popup_edit-avatar",
  (inputValues) => {
    toggleButtonSendingData(false);
    api
      .updateAvatar(inputValues.link)
      .then((userData) => {
        profileAvatar.src = userData.avatar;
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editAvatar.toggleButtonSendingData(true);
      });
  }
);

popupAddCardForm.setEventListeners();
popupEditForm.setEventListeners();
popupEditAvatar.setEventListeners();

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    const userId = userData._id;
    const cardsList = new Section({
        items: cards.reverse(),
        renderer: (card) => {
          const newCard = new Card(
            card,
            userId,
            ".template",
            (cardId) => {
              return api.addLikeToCard(cardId);
            },
            (cardId) => {
              return api.removeLikeFromCard(cardId);
            },
            (cardId) => {
              return api.deleteCardFromServer(cardId);
            },
            (cardName, imageLink) => {
              popupOpenedImage.open(cardName, imageLink);
            }
          );
          cardsList.addItem(newCard.generate())
        }
      },
      ".elements"
    );
    cardsList.renderElements();
  })
  .catch((error) => {
    console.log(error);
  });

buttonOpenEditForm.addEventListener("click", () => {
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
  popupEditForm.open();
  // Функция для проверки валидности полей при открытии попапа. Без этой функции при удалении из попапа,
  // редактировния профиля, любого поля без сохранения, при повторном открытии несмотря на заполненные поля
  // кнопка сохранить будет неактивна и будет отображаться текст с ошибкой.
  //   editForm.hasInvalidField();
});

buttonOpenAddCard.addEventListener("click", () => {
  popupAddCardForm.open();
});

buttonOpenAvatarEditForm.addEventListener("click", () => {
  popupEditAvatar.open();
});
