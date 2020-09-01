import Abstract from "./abstract.js";

const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends Abstract {
  constructor() {
    super();
    this._clickHandlerButton = this._clickHandlerButton.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandlerButton(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandlerButton(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandlerButton);
  }
}
