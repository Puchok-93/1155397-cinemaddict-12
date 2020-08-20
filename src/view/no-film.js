import {createElement} from "../utils.js";

const createNoFilmCardTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoFilmCard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmCardTemplate();
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
