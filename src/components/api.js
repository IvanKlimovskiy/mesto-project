const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '73a65b3f-f1cb-4973-9fdd-42c64f95341a',
    'Content-Type': 'application/json'
  }
}

const checkStatusOfResponse = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const getInformationFromServer = (urlApi) => {
  return fetch(urlApi, {
    headers: config.headers
  }).then((result) => {
    return checkStatusOfResponse(result)
  })
}

const updateAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
    .then((res) => {
      return checkStatusOfResponse(res)
    })
}

const updateUserInformation = (userName, userJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob
    })
  })
    .then((res) => {
      return checkStatusOfResponse(res)
    })
}

const postCardToServer = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then((res) => {
      return checkStatusOfResponse(res)
    })
}

const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      return checkStatusOfResponse(res)
    })
}

const addLikeToCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      return checkStatusOfResponse(res)
    })
}

const removeLikeFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      return checkStatusOfResponse(res)
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
  addLikeToCard,
  removeLikeFromServer
}
