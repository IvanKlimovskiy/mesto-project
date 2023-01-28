import "./index.css";
import {PopupWithForm} from "../components/PopupWithForm";
import {Card} from "../components/Card";
import {Api} from "../components/Api"
import {PopupWithImage} from "../components/PopupWithImage";
import {toggleButtonSendingData} from "../utils/utils";

import {
  enableValidation, toggleButtonState,
} from "../components/FormValidator";

import {
  profileTitle, profileSubtitle, profileAvatar, addCardForm, editAvatarForm, elementsBlock,
} from "../utils/variables";

export const settings = {
  formElement: ".edit-form",
  inputElement: ".edit-form__input-text",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  inputErrorClass: "edit-form__input-text_type_error",
  errorClass: ".edit-form__input-error",
};

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18', headers: {
    authorization: '73a65b3f-f1cb-4973-9fdd-42c64f95341a', 'Content-Type': 'application/json'
  }
})

export const popupOpenedImage = new PopupWithImage(".popup_image");
popupOpenedImage.setEventListeners()

export const popupEditForm = new PopupWithForm(".popup_edit-form", (inputValues) => {
  toggleButtonSendingData(false);
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
      toggleButtonSendingData(true);
    });
});

export const popupAddCardForm = new PopupWithForm(".popup_add-card-form", (inputValues) => {
  toggleButtonSendingData(false);
  api.postCardToServer(inputValues.name, inputValues.link)
    .then((userData) => {
      const newCard = new Card(userData, userData.owner._id, ".template", (cardId) => {
        return api.addLikeToCard(cardId)
      }, (cardId) => {
        return api.removeLikeFromCard(cardId)
      }, (cardId) => {
        return api.deleteCardFromServer(cardId)
      }, (cardName, imageLink) => {
        popupOpenedImage.open(cardName, imageLink)
      })
      addCard(newCard.generate())
      popupAddCardForm.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleButtonSendingData(true);
      toggleButtonState(true, addCardForm, settings);
    });
});

export const popupEditAvatar = new PopupWithForm(".popup_edit-avatar", (inputValues) => {
  toggleButtonSendingData(false);
  api.updateAvatar(inputValues.link)
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleButtonSendingData(true);
      toggleButtonState(true, editAvatarForm, settings);
    });
});

popupAddCardForm.setEventListeners()
popupEditForm.setEventListeners()
popupEditAvatar.setEventListeners()

function addCard(card) {
  elementsBlock.prepend(card);
}

function renderInitialCards(cards, userId) {
  cards.forEach(function (card) {
    const newCard = new Card(card, userId, ".template", (cardId) => {
      return api.addLikeToCard(cardId)
    }, (cardId) => {
      return api.removeLikeFromCard(cardId)
    }, (cardId) => {
      return api.deleteCardFromServer(cardId)
    }, (cardName, imageLink) => {
      popupOpenedImage.open(cardName, imageLink)
    })
    addCard(newCard.generate())
  });
}

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    const userId = userData._id;
    renderInitialCards(cards.reverse(), userId);
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(settings);





