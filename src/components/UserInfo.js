export default class UserInfo {
  #profileName;
  #profileJob;
  #getterUserData;
  #setterUserData;
  #profileAvatar;
  #avatarUpdater;

  constructor(profileName, profileJob, profileAvatar, getterUserData, setterUserData, avatarUpdater) {
    this.#profileName = document.querySelector(profileName);
    this.#profileJob = document.querySelector(profileJob);
    this.#profileAvatar = document.querySelector(profileAvatar);
    this.#getterUserData = getterUserData;
    this.#setterUserData = setterUserData;
    this.#avatarUpdater = avatarUpdater;
  }

  updateAvatar(userAvatar) {
    return this.#avatarUpdater(userAvatar)
      .then((userData) => {
        this.#profileAvatar.src = userData.avatar;
      })
  }

  getUserInfo() {
    return this.#getterUserData()
      .then((userData) => {
        this.#profileName.textContent = userData.name;
        this.#profileJob.textContent = userData.about;
        this.#profileAvatar.src = userData.avatar;
        return userData
      })
  }

  setUserInfo(inputFormName, inputFormJob) {
    return this.#setterUserData(inputFormName, inputFormJob)
      .then((userData) => {
        this.#profileName.textContent = userData.name;
        this.#profileJob.textContent = userData.about;
      })
  }
}
