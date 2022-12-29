import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  inputTextAddCardName,
  inputTextAddCardLink,
} from "./variables";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '73a65b3f-f1cb-4973-9fdd-42c64f95341a',
    'Content-Type': 'application/json'
  }
}

const getInformationFromServer = (urlApi) => {
  return fetch(urlApi, {
    headers: config.headers
  }).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

const updateAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar.src
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const updateUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileSubtitle.textContent
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const postCardToServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputTextAddCardName.value,
      link: inputTextAddCardLink.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const addLikeToServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const removeLikeFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

const getInitialCards = () => {
  return getInformationFromServer(`${config.baseUrl}/cards`)
}

const getUserInformation = () => {
  return getInformationFromServer(`${config.baseUrl}/users/me`)
}

export {
  getInitialCards,
  getUserInformation,
  updateUserInformation,
  updateAvatar,
  postCardToServer,
  deleteCardFromServer,
  addLikeToServer,
  removeLikeFromServer
}
