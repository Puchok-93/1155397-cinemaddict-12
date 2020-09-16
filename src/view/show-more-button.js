import AbstractView from "./abstract.js";

const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowButton extends AbstractView {
  constructor() {
    super();
    this._showButtonClickHandler = this._showButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _showButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.showButtonClick();
  }

  setShowButtonClickHandler(callback) {
    this._callback.showButtonClick = callback;
    this.getElement().addEventListener(`click`, this._showButtonClickHandler);
  }
}
