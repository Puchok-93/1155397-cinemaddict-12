import {createElement} from "../utils.js";

const createSecionFilmsTemplate = () => `<section class="films"></section>`;

export default class SiteFilms {
  constuctor() {
    this._element = null;
  }

  getTemplate() {
    return createSecionFilmsTemplate();
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
