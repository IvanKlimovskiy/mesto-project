import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #form;
  #inputList;
  #formValues;
  #defaultFieldsValuesGetter;
  #emptyFunction;

  constructor(popupSelector, handleFormSubmit, defaultFieldsValuesGetter) {
    super(popupSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#form = document.querySelector(popupSelector).querySelector(".edit-form");
    this.#emptyFunction = async function () { return {} };
    this.#defaultFieldsValuesGetter = defaultFieldsValuesGetter || this.#emptyFunction;
  }

  open() {
    this.#setInputValues(this.#defaultFieldsValuesGetter());
    super.open();
  }

  close() {
    super.close();
    this.#form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#handleFormSubmit(this.#getInputValues())
    })
  }

  #setInputValues(formData) {
    this.#inputList = Array.from(this.#form.querySelectorAll(".edit-form__input-text"));
    this.#inputList.forEach((input) => {
      if (typeof formData[input.name] !== "undefined") {
        input.value = formData[input.name];
      }
    })
  }

  #getInputValues() {
    this.#inputList = Array.from(this.#form.querySelectorAll(".edit-form__input-text"));
    this.#formValues = {}
    this.#inputList.forEach((input) => {
      this.#formValues[input.name] = input.value
    })
    return this.#formValues
  }
}
