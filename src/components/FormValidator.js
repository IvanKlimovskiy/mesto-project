export default class FormValidator {
  #validateForm;
  #inputElement;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #buttonElement;
  #formError;
  #inputElementsList;

  constructor({
                inputElement,
                submitButtonSelector,
                inactiveButtonClass,
                inputErrorClass,
                errorClass
              }, validateForm) {
    this.#inputElement = inputElement;
    this.#submitButtonSelector = submitButtonSelector;
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;
    this.#validateForm = document.querySelector(validateForm);
    this.#inputElementsList = Array.from(this.#validateForm.querySelectorAll(this.#inputElement));
  }

  enableValidation() {
    this.#inputElementsList.forEach((inputElement) => {
      this.#setEventListener(inputElement);
    });
  }

  #setEventListener(inputElement) {
    inputElement.addEventListener("input", () => {
      this.#isValid(inputElement, inputElement.dataset.errorMessage);
      this.#toggleButtonState(this.#hasInvalidInputs(this.#inputElementsList), this.#validateForm);
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
    this.#formError = this.#validateForm.querySelector(this.#errorClass);
    this.#formError.textContent = errorMessage;
  };

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.#inputErrorClass);
    this.#formError = this.#validateForm.querySelector(this.#errorClass);
    this.#formError.textContent = "";
  };

  #toggleButtonState(hasInvalidInputs, formElement) {
    this.#buttonElement = formElement.querySelector(this.#submitButtonSelector);
    if (hasInvalidInputs) {
      this.#buttonElement.classList.add(this.#inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  }

  toggleButtonSendingData(isSent) {
    this.#buttonElement = this.#validateForm.querySelector(this.#submitButtonSelector);
    if (isSent) {
      this.#buttonElement.textContent = "Сохранить"
      this.#buttonElement.disabled = false
    } else {
      this.#buttonElement.textContent = "Сохранение..."
      this.#buttonElement.disabled = true
    }
  }
}
