import {inputTextAddCardLink, inputTextAddCardName} from "./validate";
import {closePopup, popupAddCardForm} from "./modal";
import {addCard, createCard} from './card'

export function submitAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCard(inputTextAddCardName.value, inputTextAddCardLink.value));
  inputTextAddCardName.value = "";
  inputTextAddCardLink.value = "";
  closePopup(popupAddCardForm);
}
