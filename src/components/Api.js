export default class Api {
  #baseUrl;
  #headers;

  constructor({baseUrl, headers}) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  #checkStatusOfResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers
    }).then((result) => {
      return this.#checkStatusOfResponse(result)
    })
  }

  getUserInformation() {
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers
    }).then((result) => {
      return this.#checkStatusOfResponse(result)
    })
  }

  updateAvatar(userAvatar) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH', headers: this.#headers, body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

  updateUserInformation(userName, userJob) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: "PATCH", headers: this.#headers, body: JSON.stringify({
        name: userName, about: userJob
      })
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

  postCardToServer(cardName, cardLink) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: "POST", headers: this.#headers, body: JSON.stringify({
        name: cardName, link: cardLink
      })
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this.#baseUrl}/cards/${cardId}`, {
      method: "DELETE", headers: this.#headers
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

  addLikeToCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: "PUT", headers: this.#headers,
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

  removeLikeFromCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE", headers: this.#headers,
    })
      .then((result) => {
        return this.#checkStatusOfResponse(result)
      })
  }

}
