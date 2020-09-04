import MovieCard from "../view/movie-card.js";
import PopupCard from "../view/popup.js";
import {render, remove} from "../utils/render.js";
import {EscButton} from "../const.js";

const siteBody = document.body;

export default class FilmCard {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;

    this._filmCardComponent = null;
    this._popupCardComponent = null;

    this._handleFilmDetailsClick = this._handleFilmDetailsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleOnEscButtonKey = this._handleOnEscButtonKey.bind(this);
  }

  init(film) {
    this._film = film;
    this._popUpContainer = siteBody;

    this._filmCardComponent = new MovieCard(film);
    this._popupCardComponent = new PopupCard(film);

    this._filmCardComponent.setFilmDetailsClickHandler(this._handleFilmDetailsClick);
    this._popupCardComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    render(this._filmContainer, this._filmCardComponent);
  }

  _openPopup() {
    render(siteBody, this._popupCardComponent);
    document.addEventListener(`keydown`, this._handleOnEscButtonKey);
  }

  _closePopup() {
    remove(this._popupCardComponent);
    document.removeEventListener(`keydown`, this._handleOnEscButtonKey);
  }

  _handleFilmDetailsClick() {
    this._openPopup();
  }

  _handleCloseButtonClick() {
    this._closePopup();
  }

  _handleOnEscButtonKey(evt) {
    if (evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC) {
      evt.preventDefault();
      this._closePopup();
    }
  }
}
