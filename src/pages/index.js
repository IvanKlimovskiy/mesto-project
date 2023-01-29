import "./index.css";
import PopupWithForm from "../components/PopupWithForm";
import Card from "../components/Card";
import Api from "../components/Api";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";

import {
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

const validationConfig = {
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
}

export const editForm = new FormValidator(validationConfig, ".edit-form")
const addCardForm = new FormValidator(validationConfig, ".add-card-form")
const editAvatar = new FormValidator(validationConfig, ".edit-avatar-form")
editForm.enableValidation();
addCardForm.enableValidation();
editAvatar.enableValidation();

const userInformation = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar",
  () => {
    return api.getUserInformation()
  },
  (inputFormName, inputFormJob) => {
    return api.updateUserInformation(inputFormName, inputFormJob)
  },
  (userAvatar) => {
    return api.updateAvatar(userAvatar)
  }
)

const popupOpenedImage = new PopupWithImage(".popup_image");
popupOpenedImage.setEventListeners();

export const popupEditForm = new PopupWithForm(
  ".popup_edit-form",
  (inputValues) => {
    editForm.toggleButtonSendingData(false);
    userInformation.setUserInfo(inputValues.name, inputValues.job)
      .then(() => {
        popupEditForm.close()
      }).catch((error) => {
      console.log(error);
    })
      .finally(() => {
        editForm.toggleButtonSendingData(true);
      });
  },
);

const popupAddCardForm = new PopupWithForm(
  ".popup_add-card-form",
  (inputValues) => {
    addCardForm.toggleButtonSendingData(false);
    api.postCardToServer(inputValues.name, inputValues.link)
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

const popupEditAvatar = new PopupWithForm(
  ".popup_edit-avatar",
  (inputValues) => {
    editAvatar.toggleButtonSendingData(false);
    userInformation.updateAvatar(inputValues.link)
      .then(() => {
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editAvatar.toggleButtonSendingData(true);
      });
  },
);

popupAddCardForm.setEventListeners();
popupEditForm.setEventListeners();
popupEditAvatar.setEventListeners();

Promise.all([userInformation.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
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
  userInformation.getUserInfo()
    .then((userData) => {
      inputTextEditFormName.value = userData.name;
      inputTextEditFormJob.value = userData.about;
    })
  editForm.checkInputs();
  popupEditForm.open();
});

buttonOpenAddCard.addEventListener("click", () => {
  addCardForm.checkInputs();
  popupAddCardForm.open();
});

buttonOpenAvatarEditForm.addEventListener("click", () => {
  editAvatar.checkInputs();
  popupEditAvatar.open();
});
