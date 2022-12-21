import {closeByEscape} from "./modal";
import {buttonState, hasInvalidField, hasInvalidInputs} from "./validate";
import {settings} from "./index";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closeByEscape)

  // Функция для проверки валидности полей при открытии попапа. Без этой функции при удалении из попапа,
  // редактировния профиля, любого поля без сохранения, при повторном открытии несмотря на заполненные поля
  // кнопка сохранить будет неактивна и будет отображаться текст с ошибкой.
  const popupForm = popup.querySelector('.edit-form')
  const popupInputs = Array.from(popup.querySelectorAll('.edit-form__input-text'))
  popupInputs.forEach((popupInput) => {
    if (!popupForm.classList.contains('add-card-form')) {
      hasInvalidField(popupForm, popupInput, settings)
      buttonState(hasInvalidInputs(popupInputs), popupForm, settings)
    }
  })
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closeByEscape)
}

export {openPopup, closePopup};
