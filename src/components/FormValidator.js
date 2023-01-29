export default class FormValidator {
  #validateForm;
  #inputElement;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #buttonElement;
  #formError;
  #inputElementsList;
  #inputElements

  constructor(config, validateForm) {

    this.#inputElement = config.inputElement;
    this.#submitButtonSelector = config.submitButtonSelector;
    this.#inactiveButtonClass = config.inactiveButtonClass;
    this.#inputErrorClass = config.inputErrorClass;
    this.#validateForm = document.querySelector(validateForm);
    this.#inputElementsList = Array.from(this.#validateForm.querySelectorAll(this.#inputElement));
    this.#buttonElement = this.#validateForm.querySelector(this.#submitButtonSelector);
  }

  enableValidation() {
    this.#inputElementsList.forEach((inputElement) => {
      this.#setEventListener(inputElement);
    });
  }

  checkInputs() {
    this.#inputElements = Array.from(this.#validateForm.querySelectorAll(this.#inputElement));
    this.#inputElements.forEach((inputElement) => {
      if (inputElement.value === "") {
        this.#toggleButtonState(this.#hasInvalidInputs(this.#inputElements))
      }
    })
  }

  #setEventListener(inputElement) {
    inputElement.addEventListener("input", () => {
      this.#isValid(inputElement, inputElement.dataset.errorMessage);
      this.#toggleButtonState(this.#hasInvalidInputs(this.#inputElementsList));
    });
  };

  #hasInvalidInputs(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #isValid(inputElement, errorMessage) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(errorMessage)
    } else {
      inputElement.setCustomValidity("")
    }
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this.#inputErrorClass);
    this.#formError = this.#validateForm.querySelector(`.${inputElement.id}-error`);
    this.#formError.textContent = errorMessage;
  };

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.#inputErrorClass);
    this.#formError = this.#validateForm.querySelector(`.${inputElement.id}-error`);
    this.#formError.textContent = "";
  };

  #toggleButtonState(hasInvalidInputs) {
    if (hasInvalidInputs) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  }

  toggleButtonSendingData(isSent) {
    if (isSent) {
      this.#buttonElement.textContent = "Сохранить"
      this.#toggleButtonState(false)
    } else {
      this.#buttonElement.textContent = "Сохранение..."
      this.#toggleButtonState(true)
    }
  }
}
