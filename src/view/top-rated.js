import {createElement} from "../utils.js";

const createTopRatedFimlsTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    </section>`
  );
};

export default class TopRatedFilms {
  constuctor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFimlsTemplate();
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
