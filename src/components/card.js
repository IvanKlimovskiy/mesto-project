import {popupImage} from "./variables";
import {openPopup} from "./utils";
import {addLikeToServer, deleteCardFromServer, removeLikeFromServer} from "./api";
import {
  elementsBlock,
  elementTemplate,
  imageTitle,
  myId,
  popupOpenedImage,
  profileTitle
} from "./variables";

function createCard(name, link, cardOwner, cardId, likesArray) {
  const articleElement = elementTemplate.querySelector(".element").cloneNode(true);
  const buttonLike = articleElement.querySelector(".element__like");
  const buttonTrash = articleElement.querySelector(".element__trash");
  const elementImage = articleElement.querySelector(".element__image");
  const elementLikeNumber = articleElement.querySelector(".element__like-number");

  articleElement.querySelector(".element__title").textContent = name;
  elementImage.alt = name;
  elementImage.src = link;
  if (likesArray.filter(like => like.name === profileTitle.textContent).length > 0) {
    buttonLike.classList.add("element__like_active");
  }
  buttonLike.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      evt.target.classList.add("element__like_active");
      addLikeToServer(cardId)
        .then((userData) => {
          elementLikeNumber.textContent = userData.likes.length
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      evt.target.classList.remove("element__like_active");
      removeLikeFromServer(cardId)
        .then((userData) => {
          elementLikeNumber.textContent = userData.likes.length
        })
        .catch((error) => {
          console.log(error)
        })
    }
  });
  elementLikeNumber.textContent = likesArray.length
  if (cardOwner === myId) {
    buttonTrash.addEventListener("click", function (evt) {
      evt.preventDefault();
      deleteCardFromServer(cardId)
        .then(() => {
          evt.target.closest(".element").remove();
        })
        .catch((error) => {
          console.log(error)
        })
    });
  } else {
    buttonTrash.style.display = 'none'
  }
  elementImage.addEventListener("click", function () {
    popupOpenedImage.src = link;
    imageTitle.textContent = name;
    popupOpenedImage.alt = name;
    openPopup(popupImage);
  });
  return articleElement;
}

function addCard(card) {
  elementsBlock.prepend(card);
}

function renderInitialCards(cards) {
  cards.forEach(function (card) {
    addCard(createCard(card.name, card.link, card.owner._id, card._id, card.likes));
  });
}

export {renderInitialCards, addCard, createCard};
