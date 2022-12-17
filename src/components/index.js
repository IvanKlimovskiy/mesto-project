import "../pages/index.css";
import {
  submitEditProfileForm,
  submitAddCardForm,
  renderinitialCards,
} from "./card";
import {
  openPopup,
  closePopup,
  popupEditForm,
  popupAddCardForm,
  popupImage,
  buttonClosePopupImage,
  buttonCloseEditForm,
  buttonCloseAddCardForm,
  buttonOpenEditForm,
  buttonOpenAddCard,
} from "./modal";

import {
  editProfileForm,
  addCardForm,
  profileTitle,
  profileSubtitle,
  inputTextEditFormName,
  inputTextEditFormJob,
} from "./validate";

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

const formElements = Array.from(document.forms);

const buttonState = (hasInvalidInputs, formElement) => {
  const buttonElement = formElement.querySelector(".edit-form__button");
  if (hasInvalidInputs) {
    buttonElement.classList.add("edit-form__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("edit-form__button_disabled");
    buttonElement.disabled = false;
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, formInput, errorMessage) => {
  formInput.classList.add("edit-form__input-text_type_error");
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, formInput) => {
  formInput.classList.remove("edit-form__input-text_type_error");
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = "";
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.dataset.errorMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListener = (formElement, inputElement) => {
  inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, inputElement.dataset.errorMessage);
  });
};

formElements.forEach((formElement) => {
  const inputElementsList = Array.from(
    formElement.querySelectorAll(".edit-form__input-text")
  );
  buttonState(hasInvalidInputs(inputElementsList), formElement);
  inputElementsList.forEach((inputElement) => {
    setEventListener(formElement, inputElement);
  });
});

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
