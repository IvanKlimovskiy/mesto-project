const toggleButtonState = (hasInvalidInputs, formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInputs) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, formInput, errorMessage) => {
  formInput.classList.add(`.${formInput.id}-error`);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, formInput, config) => {
  formInput.classList.remove(config.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = "";
};

const isValid = (formElement, formInput, errorMessage, config) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(errorMessage)
  } else {
    formInput.setCustomValidity("")
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, config);
  } else {
    hideInputError(formElement, formInput, config);
  }
};

const setEventListener = (formElement, inputElement, config) => {
  const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
  inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, inputElement.dataset.errorMessage, config);
    toggleButtonState(hasInvalidInputs(inputElementsList), formElement, config);
  });
};

const enableValidation = (config) => {
  const formElements = Array.from(document.querySelectorAll(config.formElement));
  formElements.forEach((formElement) => {
    const inputElementsList = Array.from(formElement.querySelectorAll(config.inputElement));
    inputElementsList.forEach((inputElement) => {
      setEventListener(formElement, inputElement, config);
    });
  });
}

const hasInvalidField = (formElement, formInput, config) => {
  if (formInput.value === "") {
    showInputError(formElement, formInput, formInput.validationMessage, config);
  } else {
    hideInputError(formElement, formInput, config);
  }
}

export {
  toggleButtonState,
  hasInvalidInputs,
  showInputError,
  hideInputError,
  isValid,
  setEventListener,
  enableValidation,
  hasInvalidField
}

