import MovieCard from "../view/movie-card.js";
import PopupCard from "../view/popup.js";
import {render, remove} from "../utils/render.js";
import {EscButton} from "../const.js";

const siteBody = document.body;

export default class FilmCard {
  constructor(filmContainer, changeFilm) {
    this._filmContainer = filmContainer;
    this._changeFilm = changeFilm;

    this._filmCardComponent = null;
    this._popupCardComponent = null;

    this._handleFilmDetailsClick = this._handleFilmDetailsClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleOnEscButtonKey = this._handleOnEscButtonKey.bind(this);

    this._handleWatchClick = this._handleWatchClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);


  }

  init(film) {
    this._film = film;
    this._popUpContainer = siteBody;

    const prevFilmCardComponent = this._taskComponent;
    const prevPopupCardComponent = this._taskEditComponent;

    this._filmCardComponent = new MovieCard(film);
    this._popupCardComponent = new PopupCard(film);

    this._filmCardComponent.setFilmDetailsClickHandler(this._handleFilmDetailsClick);
    this._popupCardComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    this._filmCardComponent.setIsWatchClickHandler(this._handleWatchClick);


    render(this._filmContainer, this._filmCardComponent);


    //remove(prevFilmCardComponent);
    //remove(prevPopupCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupCardComponent);
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

  _handleWatchClick() {
    this._changeFilm(
        Object.assign(
            {},
            this._film,
            {
              isWatch: !this._film.isWatch
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeFilm(
        Object.assign(
            {},
            this._film,
            {
              isHistory: !this._film.isHistory
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeFilm(
        Object.assign(
            {},
            this._film,
            {
              isFavorites: !this._film.isFavorites
            }
        )
    );
  }
}
