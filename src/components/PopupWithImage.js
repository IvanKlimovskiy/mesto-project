import Popup from './Popup';

export default class PopupWithImage extends Popup {
  #popup;
  #buttonClosePopup;
  #imageTitle;
  #popupImage;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#popupImage = this.#popup.querySelector('.popup__image');
    this.#imageTitle = this.#popup.querySelector('.popup__title');
    this.#buttonClosePopup = this.#popup.querySelector('.popup__close-button');
  }

  open(cardName, imageLink) {
    super.open();
    this.#popupImage.src = imageLink;
    this.#imageTitle.textContent = cardName;
    this.#popup.alt = cardName;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
