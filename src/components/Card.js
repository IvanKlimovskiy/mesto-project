export default class Card {
  #cardName;
  #imageLink;
  #cardOwner;
  #userId;
  #cardId;
  #likes;
  #selectorCardTemplate;
  #liker;
  #disliker;
  #deleter;
  #popupOpener;
  #buttonLike;
  #element;
  #buttonTrash;
  #profileTitle;
  #elementImage;

  constructor(data, userId, selectorCardTemplate, liker, disliker, deleter, popupOpener) {
    this.#cardName = data.name;
    this.#imageLink = data.link;
    this.#cardOwner = data.owner._id;
    this.#cardId = data._id;
    this.#likes = data.likes;
    this.#userId = userId;
    this.#profileTitle = document.querySelector('.profile__title');
    this.#selectorCardTemplate = selectorCardTemplate;
    this.#liker = liker;
    this.#disliker = disliker;
    this.#deleter = deleter;
    this.#popupOpener = popupOpener;
  }

  #getElement() {
    return document.querySelector(this.#selectorCardTemplate).content.querySelector('.element').cloneNode(true);
  }

  generate() {
    this.#element = this.#getElement();
    this.#element.querySelector('.element__title').textContent = this.#cardName;
    this.#element.querySelector('.element__image').alt = this.#cardName;
    this.#element.querySelector('.element__image').src = this.#imageLink;
    this.#element.querySelector('.element__like-number').textContent = this.#likes.length;

    if (this.#likes.some((like) => like.name === this.#profileTitle.textContent)) {
      this.#element.querySelector('.element__like').classList.add('element__like_active');
    }
    if (this.#cardOwner === this.#userId) {
      this.#element.querySelector('.element__trash').style.display = 'block';
    }

    this.#setEventListeners();

    return this.#element;
  }

  #setEventListeners() {
    this.#buttonLike = this.#element.querySelector('.element__like');
    this.#buttonLike.addEventListener('click', () => {
      this.#toggleLike();
    });

    this.#buttonTrash = this.#element.querySelector('.element__trash');
    this.#buttonTrash.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#delete();
    });

    this.#elementImage = this.#element.querySelector('.element__image');
    this.#elementImage.addEventListener('click', () => {
      this.#handleCardClick();
    });
  }

  #toggleLike() {
    if (!this.#buttonLike.classList.contains('element__like_active')) {
      this.#buttonLike.classList.add('element__like_active');
      this.#liker(this.#cardId)
        .then((userData) => {
          this.#element.querySelector('.element__like-number').textContent = userData.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.#buttonLike.classList.remove('element__like_active');
      this.#disliker(this.#cardId)
        .then((userData) => {
          this.#element.querySelector('.element__like-number').textContent = userData.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  #delete() {
    this.#deleter(this.#cardId)
      .then(() => {
        this.#element.querySelector('.element__trash').closest('.element').remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #handleCardClick() {
    this.#popupOpener(this.#cardName, this.#imageLink);
  }
}
