import {createElement} from "../utils.js";

const createFilmDetailsTemplate = () => {
  return (
    `<section class="film-details"></section>`
  );
};

export default class FilmDetails {
  constuctor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
