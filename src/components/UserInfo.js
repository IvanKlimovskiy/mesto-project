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
    this.#inputTextEditFormName = document.querySelector('.edit-form__input-text-name');
    this.#inputTextEditFormJob = document.querySelector('.edit-form__input-text-job');
    this.#getterUserData = getterUserData;
    this.#setterUserData = setterUserData;
    this.#avatarUpdater = avatarUpdater;
  }

  updateAvatar(userAvatar) {
    return this.#avatarUpdater(userAvatar).then((userData) => {
      this.#profileAvatar.src = userData.avatar;
    });
  }

  getUserInfo() {
    return this.#getterUserData().then((userData) => {
      this.#profileName.textContent = userData.name;
      this.#profileJob.textContent = userData.about;
      this.#inputTextEditFormName.value = userData.name;
      this.#inputTextEditFormJob.value = userData.about;
      this.#profileAvatar.src = userData.avatar;
      return userData;
    });
  }

  setUserInfo(inputFormName, inputFormJob) {
    return this.#setterUserData(inputFormName, inputFormJob).then((userData) => {
      this.#profileName.textContent = userData.name;
      this.#profileJob.textContent = userData.about;
    });
  }
}
