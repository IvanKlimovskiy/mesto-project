const buttonCloseEditForm = document.querySelector(".edit-form__close-button");
const buttonCloseAddCardForm = document.querySelector(".add-card-form__close-button");
const buttonClosePopupImage = document.querySelector(".popup__close-button");
const popupEditForm = document.querySelector(".popup_edit-form")
const popupAddCardForm = document.querySelector(".popup_add-card-form")
const popupImage = document.querySelector(".popup_image")
const buttonOpenEditForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editProfileForm = document.querySelector(".edit-form");
const addCardForm = document.querySelector(".add-card-form");
const inputTextEditFormName = document.querySelector(".edit-form__input-text-name");
const inputTextEditFormJob = document.querySelector(".edit-form__input-text-job");
const inputTextAddCardName = document.querySelector(".add-card-form__input-text-card-name");
const inputTextAddCardLink = document.querySelector(".add-card-form__input-text-link");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonCloseEditForm.addEventListener("click", () => {
  closePopup(popupEditForm);
});

buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCardForm);
});





buttonOpenEditForm.addEventListener("click", function () {
  popupEditForm.classList.add("popup_opened");
  inputTextEditFormName.setAttribute("value", profileTitle.textContent);
  inputTextEditFormJob.setAttribute("value", profileSubtitle.textContent);
});

buttonOpenAddCard.addEventListener("click", function () {
  popupAddCardForm.classList.add("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTextEditFormName.value;
  profileSubtitle.textContent = inputTextEditFormJob.value;
  closePopup(popupEditForm);
}

editProfileForm.addEventListener("submit", formSubmitHandler);

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
      const popupOpenedImage = document.querySelector(".popup__image");
      const popupTitle = document.querySelector(".popup__title");
      popupOpenedImage.src = evt.target.src;
      popupTitle.textContent = evt.target.alt;
      popupOpenedImage.alt = evt.target.alt;
      popupImage.classList.add("popup_opened");
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
    const popupOpenedImage = document.querySelector(".popup__image");
    const popupTitle = document.querySelector(".popup__title");
    popupOpenedImage.src = evt.target.src;
    popupTitle.textContent = evt.target.alt;
    popupOpenedImage.alt = evt.target.alt;
    popupImage.classList.add("popup_opened");
  });
  articleElement.querySelector(".element__title").textContent = inputTextAddCardName.value;
  articleElement.querySelector(".element__image").alt = inputTextAddCardName.value;
  articleElement.querySelector(".element__image").src = inputTextAddCardLink.value;
  elementsBlock.prepend(articleElement);
  inputTextAddCardName.value = "";
  inputTextAddCardLink.value = "";
  closePopup(popupAddCardForm);
}

addCardForm.addEventListener("submit", formAddElement);



buttonClosePopupImage.addEventListener("click", function () {
  closePopup(popupImage);
});

renderElements();
