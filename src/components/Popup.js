export default class Popup {
  #popupSelector;
  #buttonClosePopup;
  #popup;

  constructor(popupSelector) {
    this.#popupSelector = popupSelector;
    this.#popup = document.querySelector(popupSelector);
    this.#buttonClosePopup = this.#popup.querySelector('.popup__close-button');
  }

  open() {
    this.#popup.classList.add('popup_opened');
    window.addEventListener('keydown', (evt) => {
      this.#handleEscapeClose(evt);
    });
  }

  close() {
    this.#popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', (evt) => {
      this.#handleEscapeClose(evt);
    });
  }

  #handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.#buttonClosePopup.addEventListener('click', () => {
      this.close();
    });
    this.#popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
