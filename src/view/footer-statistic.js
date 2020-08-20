import {createElement} from "../utils.js";

const createFooterStatisticTemplate = (quantityMovies) => `<p>${quantityMovies} movies inside</p>`;

export default class FooterStatistic {
  constructor(quantityMovies) {
    this._quantityMovies = quantityMovies;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._quantityMovies);
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
