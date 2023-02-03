import "./index.css";
import PopupWithForm from "../components/PopupWithForm";
import Card from "../components/Card";
import {api} from "../components/Api";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";

import {
  buttonOpenEditForm,
  buttonOpenAddCard,
  buttonOpenAvatarEditForm,
  userProfileSelectors,
  validationConfig
} from "../utils/variables";

const popupOpenedImage = new PopupWithImage(".popup_image");
popupOpenedImage.setEventListeners();

const userInformation = new UserInfo(userProfileSelectors);

const popupEditForm = new PopupWithForm(
  ".popup_edit-form",
  (inputValues) => {
    editForm.toggleButtonSendingData(false);
    api.updateUserInformation(inputValues.name, inputValues.about)
      .then((userData) => {
        userInformation.setUserInfo(userData)
        popupEditForm.close()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        editForm.toggleButtonSendingData(true);
      });
  },
  userInformation.getUserInfo.bind(userInformation)
);

const editForm = new FormValidator(validationConfig, ".edit-form")
editForm.enableValidation();
popupEditForm.setEventListeners();

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

const addCardForm = new FormValidator(validationConfig, ".add-card-form")
addCardForm.enableValidation();
popupAddCardForm.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  ".popup_edit-avatar",
  (inputValues) => {
    editAvatar.toggleButtonSendingData(false);
    api.updateAvatar(inputValues.link)
      .then((userData) => {
        userInformation.setUserInfo(userData)
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

const editAvatar = new FormValidator(validationConfig, ".edit-avatar-form")
editAvatar.enableValidation();
popupEditAvatar.setEventListeners();

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    userInformation.setUserInfo(userData)
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
  popupEditForm.open();
  editForm.checkInputs();
});

buttonOpenAddCard.addEventListener("click", () => {
  addCardForm.checkInputs();
  popupAddCardForm.open();
});

buttonOpenAvatarEditForm.addEventListener("click", () => {
  editAvatar.checkInputs();
  popupEditAvatar.open();
});
