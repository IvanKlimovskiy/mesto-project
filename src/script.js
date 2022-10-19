const closeButton = document.querySelectorAll(".edit-form__close-button");
const popup = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelectorAll(".edit-form");
const input = document.querySelectorAll(".edit-form__input-text");

function closePopup(index) {
  popup[index].classList.remove("popup_opened");
}

closeButton[0].addEventListener("click", () => {
  closePopup(0);
});

closeButton[1].addEventListener("click", () => {
  closePopup(1);
});

editButton.addEventListener("click", function () {
  popup[0].classList.add("popup_opened");
  input[0].setAttribute("value", profileTitle.textContent);
  input[1].setAttribute("value", profileSubtitle.textContent);
});

addButton.addEventListener("click", function () {
  popup[1].classList.add("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = input[0].value;
  profileSubtitle.textContent = input[1].value;
  closePopup(0);
}

formElement[0].addEventListener("submit", formSubmitHandler);

const elementTemplate = document.querySelector(".template").content;
const elementsBlock = document.querySelector(".elements");

function renderElements() {
  initialCards.forEach(function (item) {
    const articleElement = elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    const buttonLike = articleElement.querySelector(".element__like");
    buttonLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
    const buttonTrash = articleElement.querySelector(".element__trash");
    buttonTrash.addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
    const elementImage = articleElement.querySelector(".element__image");
    elementImage.addEventListener("click", function (evt) {
      const popupImage = document.querySelector(".popup__image");
      const popupTitle = document.querySelector(".popup__title");
      popupImage.src = evt.target.src;
      popupTitle.textContent = evt.target.alt;
      popupImage.alt = evt.target.alt;
      popup[2].classList.add("popup_opened");
    });
    articleElement.querySelector(".element__title").textContent = item.name;
    articleElement.querySelector(".element__image").alt = item.name;
    articleElement.querySelector(".element__image").src = item.link;
    elementsBlock.prepend(articleElement);
  });
}

function formAddElement(evt) {
  evt.preventDefault();
  const newElement = {};
  newElement.name = input[2].value;
  newElement.link = input[3].value;
  initialCards.unshift(newElement);
  const articleElement = elementTemplate
    .querySelector(".element")
    .cloneNode(true);
  const buttonLike = articleElement.querySelector(".element__like");
  buttonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });
  const buttonTrash = articleElement.querySelector(".element__trash");
  buttonTrash.addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });
  const elementImage = articleElement.querySelector(".element__image");
  elementImage.addEventListener("click", function (evt) {
    const popupImage = document.querySelector(".popup__image");
    const popupTitle = document.querySelector(".popup__title");
    popupImage.src = evt.target.src;
    popupTitle.textContent = evt.target.alt;
    popupImage.alt = evt.target.alt;
    popup[2].classList.add("popup_opened");
  });
  articleElement.querySelector(".element__title").textContent = input[2].value;
  articleElement.querySelector(".element__image").alt = input[2].value;
  articleElement.querySelector(".element__image").src = input[3].value;
  elementsBlock.prepend(articleElement);
  input[2].value = "";
  input[3].value = "";
  closePopup(1);
}

formElement[1].addEventListener("submit", formAddElement);

const popupCloseButton = document.querySelector(".popup__close-button");

popupCloseButton.addEventListener("click", function () {
  closePopup(2);
});

renderElements();
