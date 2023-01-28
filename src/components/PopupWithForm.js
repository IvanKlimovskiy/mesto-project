import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  #handleFormSubmit;
  #form;
  #inputList;
  #formValues;

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.#handleFormSubmit = handleFormSubmit
    this.#form = document.querySelector(popupSelector).querySelector(".edit-form")
  }

  open() {
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

  #getInputValues() {
    this.#inputList = Array.from(this.#form.querySelectorAll(".edit-form__input-text"));
    this.#formValues = {}
    this.#inputList.forEach((input) => {
      this.#formValues[input.name] = input.value
    })
    return this.#formValues
  }
}
