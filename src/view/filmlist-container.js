import {createElement} from "../utils.js";

const createFilmLIstContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmListContainer {
  constuctor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmLIstContainerTemplate();
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
