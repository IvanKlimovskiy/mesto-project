import sochiImage from "../images/sochi.jpg";
import baykalImage from "../images/baykal-view.jpg";
import karachaevskImage from "../images/karachaevsk.jpg";
import dombaiImage from "../images/dombai.jpg";
import elbrusMountainImage from "../images/elbrus_mountain.jpg";
import araratImage from "../images/ararat.jpg";
import {popupImage} from "./modal";
import {openPopup} from "./utils";

const initialCards = [{
  name: "Сочи", link: sochiImage,
}, {
  name: "Байкал", link: baykalImage,
}, {
  name: "Карачаево-Черкесия", link: karachaevskImage,
}, {
  name: "Домбай", link: dombaiImage,
}, {
  name: "Гора Эльбрус", link: elbrusMountainImage,
}, {
  name: "Гора Арарат", link: araratImage,
},];
const elementTemplate = document.querySelector(".template").content;
const popupOpenedImage = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title");
const elementsBlock = document.querySelector(".elements");

function createCard(name, link) {
  const articleElement = elementTemplate.querySelector(".element").cloneNode(true);
  const buttonLike = articleElement.querySelector(".element__like");
  const buttonTrash = articleElement.querySelector(".element__trash");
  const elementImage = articleElement.querySelector(".element__image");

  articleElement.querySelector(".element__title").textContent = name;
  elementImage.alt = name;
  elementImage.src = link;
  buttonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });
  buttonTrash.addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });
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

function renderInitialCards() {
  initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
  });
}

export {renderInitialCards, addCard, createCard};
