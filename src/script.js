const buttonCloseEditForm = document.querySelector(".edit-form__close-button");
const buttonCloseAddCardForm = document.querySelector(".add-card-form__close-button");
const buttonClosePopupImage = document.querySelector(".popup__close-button");
const popupEditForm = document.querySelector(".popup_edit-form");
const popupAddCardForm = document.querySelector(".popup_add-card-form");
const popupImage = document.querySelector(".popup_image");
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
const popupOpenedImage = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title");
const elementTemplate = document.querySelector(".template").content;
const elementsBlock = document.querySelector(".elements");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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

function createCard(name, link) {
  const articleElement = elementTemplate.querySelector(".element").cloneNode(true);
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
    addCard(createCard(item.name, item.link))
  })
}

renderinitialCards();

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardForm.addEventListener("submit", submitAddCardForm);

buttonCloseEditForm.addEventListener("click", () => {
  closePopup(popupEditForm);
});

buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCardForm);
});

buttonOpenEditForm.addEventListener("click", () => {
  openPopup(popupEditForm);
  inputTextEditFormName.value = profileTitle.textContent;
  inputTextEditFormJob.value = profileSubtitle.textContent;
});

buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCardForm);
});

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});
