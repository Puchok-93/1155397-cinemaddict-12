import {createElement} from "../utils.js";

const createMostcommentedFimlsTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class MostcommentedFimls {
  constuctor() {
    this._element = null;
  }

  getTemplate() {
    return createMostcommentedFimlsTemplate();
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