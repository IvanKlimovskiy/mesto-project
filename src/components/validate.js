import {config} from "./index";

export const profileTitle = document.querySelector(".profile__title");

export const profileSubtitle = document.querySelector(".profile__subtitle");
export const editProfileForm = document.querySelector(".edit-form");
export const inputTextEditFormName = document.querySelector(".edit-form__input-text-name");
export const inputTextEditFormJob = document.querySelector(".edit-form__input-text-job");
export const addCardForm = document.querySelector(".add-card-form");
export const inputTextAddCardName = document.querySelector(".add-card-form__input-text-card-name");
export const inputTextAddCardLink = document.querySelector(".add-card-form__input-text-link");

export const buttonState = (hasInvalidInputs, formElement) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInputs) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

export const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const showInputError = (formElement, formInput, errorMessage) => {
  formInput.classList.add(config.inputErrorClass);
  const formError = formElement.querySelector(config.errorClass);
  formError.textContent = errorMessage;
};

export const hideInputError = (formElement, formInput) => {
  formInput.classList.remove(config.inputErrorClass);
  const formError = formElement.querySelector(config.errorClass);
  formError.textContent = "";
};

export const isValid = (formElement, formInput, errorMessage) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(errorMessage)
  } else {
    formInput.setCustomValidity("")
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListener = (formElement, inputElement) => {
  const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
  inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, inputElement.dataset.errorMessage);
    buttonState(hasInvalidInputs(inputElementsList), formElement);
  });
};

export const enableValidation = () => {
  const formElements = Array.from(document.querySelectorAll(config.formElement));
  formElements.forEach((formElement) => {
    const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
    inputElementsList.forEach((inputElement) => {
      setEventListener(formElement, inputElement);
    });
  });
}


