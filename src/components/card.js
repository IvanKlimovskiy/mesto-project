import sochiImage from "../images/sochi.jpg";
import baykalImage from "../images/baykal-view.jpg";
import karachaevskImage from "../images/karachaevsk.jpg";
import dombaiImage from "../images/dombai.jpg";
import elbrusMountainImage from "../images/elbrus_mountain.jpg";
import araratImage from "../images/ararat.jpg";
import { openPopup, popupImage } from "./modal";
import {
  inputTextAddCardName,
  inputTextAddCardLink,
  profileTitle,
  profileSubtitle,
  inputTextEditFormName,
  inputTextEditFormJob,
} from "./validate";
import {
  closePopup,
  popupEditForm,
  popupAddCardForm,
} from "./modal";

const initialCards = [
  {
    name: "Сочи",
    link: sochiImage,
  },
  {
    name: "Байкал",
    link: baykalImage,
  },
  {
    name: "Карачаево-Черкесия",
    link: karachaevskImage,
  },
  {
    name: "Домбай",
    link: dombaiImage,
  },
  {
    name: "Гора Эльбрус",
    link: elbrusMountainImage,
  },
  {
    name: "Гора Арарат",
    link: araratImage,
  },
];
const elementTemplate = document.querySelector(".template").content;
const elementsBlock = document.querySelector(".elements");

function createCard(name, link) {
  const articleElement = elementTemplate
    .querySelector(".element")
    .cloneNode(true);
  const buttonLike = articleElement.querySelector(".element__like");
  const buttonTrash = articleElement.querySelector(".element__trash");
  const elementImage = articleElement.querySelector(".element__image");
  const articleElementImage = articleElement.querySelector(".element__image");
  articleElement.querySelector(".element__title").textContent = name;
  articleElementImage.alt = name;
  articleElementImage.src = link;
  buttonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });
  buttonTrash.addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });
  elementImage.addEventListener("click", function () {
    const popupOpenedImage = document.querySelector(".popup__image");
    const imageTitle = document.querySelector(".popup__title");
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

function renderinitialCards() {
  initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
  });
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTextEditFormName.value;
  profileSubtitle.textContent = inputTextEditFormJob.value;
  closePopup(popupEditForm);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCard(inputTextAddCardName.value, inputTextAddCardLink.value));
  inputTextAddCardName.value = "";
  inputTextAddCardLink.value = "";
  closePopup(popupAddCardForm);
}
export { submitEditProfileForm, submitAddCardForm, renderinitialCards };
