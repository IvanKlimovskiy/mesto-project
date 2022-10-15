const closeButton = document.querySelectorAll('.edit-form__close-button');
const popup = document.querySelectorAll('.popup')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.edit-form');
const input = document.querySelectorAll('.edit-form__input-text');

function closePopup(index) {
  popup[index].classList.remove('popup_opened');
}

closeButton[0].addEventListener('click', () => {
  closePopup(0);
});
closeButton[1].addEventListener('click', () => {
  closePopup(1);
});

editButton.addEventListener('click', function() {
  popup[0].classList.add('popup_opened');
  input[0].setAttribute('value', profileTitle.textContent); 
  input[1].setAttribute('value', profileSubtitle.textContent); 
})

addButton.addEventListener('click', function() {
  popup[1].classList.add('popup_opened');
})

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileTitle.textContent = input[0].value;
  profileSubtitle.textContent = input[1].value;

  closePopup(0);
}
formElement.addEventListener('submit', formSubmitHandler);