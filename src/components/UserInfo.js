export default class UserInfo {
  #profileName;
  #profileJob;
  #getterUserData;
  #setterUserData;
  #profileAvatar;
  #avatarUpdater;
  #inputTextEditFormName;
  #inputTextEditFormJob;

  constructor(profileName, profileJob, profileAvatar, getterUserData, setterUserData, avatarUpdater) {
    this.#profileName = document.querySelector(profileName);
    this.#profileJob = document.querySelector(profileJob);
    this.#profileAvatar = document.querySelector(profileAvatar);
    this.#inputTextEditFormName = document.querySelector(".edit-form__input-text-name");
    this.#inputTextEditFormJob = document.querySelector(".edit-form__input-text-job");
    this.#getterUserData = getterUserData;
    this.#setterUserData = setterUserData;
    this.#avatarUpdater = avatarUpdater;
  }

  updateAvatar(userAvatar) {
    return this.#avatarUpdater(userAvatar)
      .then((userData) => {
        this.#profileAvatar.src = userData.data.user.avatar;
      })
  }

  getUserInfo() {
    return this.#getterUserData()
      .then((userData) => {
        this.#profileName.textContent = userData.user.name;
        this.#profileJob.textContent = userData.user.about;
        this.#inputTextEditFormName.value = userData.user.name;
        this.#inputTextEditFormJob.value = userData.user.about;
        this.#profileAvatar.src = userData.user.avatar;
        return userData
      })
  }

  setUserInfo(inputFormName, inputFormJob) {
    return this.#setterUserData(inputFormName, inputFormJob)
      .then((userData) => {
        this.#profileName.textContent = userData.data.user.name;
        this.#profileJob.textContent = userData.data.user.about;
      })
  }
}
