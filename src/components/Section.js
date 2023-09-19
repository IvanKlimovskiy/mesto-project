export default class Section {
  #initialArray;
  #renderer;
  #selectorBlock;

  constructor({ items, renderer }, selectorBlock) {
    this.#initialArray = items;
    this.#renderer = renderer;
    this.#selectorBlock = document.querySelector(selectorBlock);
  }

  renderElements() {
    this.#initialArray.forEach((item) => {
      this.#renderer(item);
    });
  }

  addItem(card) {
    this.#selectorBlock.prepend(card);
  }
}
