export default class UserInfo {
  #profileName;
  #profileJob;
  #profileAvatar;

  constructor({profileName, profileJob, profileAvatar}) {
    this.#profileName = document.querySelector(profileName);
    this.#profileJob = document.querySelector(profileJob);
    this.#profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      about: this.#profileJob.textContent
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    this.#profileName.textContent = name;
    this.#profileJob.textContent = about;
    this.#profileAvatar.src = avatar;
    this.#profileAvatar.alt = `фотография ${name}`;
    this._id = _id;
  }
}
