import {getTopRatedFilms, getMostCommentedFilms} from "../mock/movie-card.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {sortByRating, sortByDate} from "../utils/sort-film.js";
import {SortType, COUNT_MOVIE_CARD_STEP, COUNT_MOVIE_CARD_EXTRA, EscButton} from "../const.js";

import SiteFilms from "../view/section-films.js";
import SiteSort from "../view/sort.js";
import SectionFilmsList from "../view/films-list.js";
import FilmListContainer from "../view/filmlist-container.js";
import TopRatedFilms from "../view/top-rated.js";
import MostcommentedFilms from "../view/most-commented.js";
import MovieCard from "../view/movie-card.js";
import PopupCard from "../view/popup.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilmCard from "../view/no-film.js";

const siteBody = document.body;
const siteMain = document.querySelector(`.main`);

export default class FilmBoard {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._renderedFilmsExtraCount = COUNT_MOVIE_CARD_EXTRA;
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new SiteFilms();
    this._filmSortComponent = new SiteSort();
    this._noFilmCardComponent = new NoFilmCard();

    this._mainFilmListComponent = new SectionFilmsList();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostcommentedFilmsComponent = new MostcommentedFilms();

    this._allFilmsListComponent = new FilmListContainer();
    this._topRatedFilmsListComponent = new FilmListContainer();
    this._mostCommentedFilmsListComponent = new FilmListContainer();

    this._renderedFilmsFrom = 0;
    this._renderedFilmsTo = 0;

    this._showMoreButtonComponent = new ShowMoreButton();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cards) {
    this._cards = cards.slice();
    this._sourcedCards = cards.slice();

    this._topRatedFilms = getTopRatedFilms(this._cards);
    this._mostCommentedFilms = getMostCommentedFilms(this._cards);

    render(this._movieListContainer, this._filmsComponent);

    this._renderFilmLists();
  }

  /* --------------------------------------------- Сортируем фильмы --------------------------------------------- */

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._cards.sort(sortByDate);
        break;
      case SortType.RATING:
        this._cards.sort(sortByRating);
        break;
      default:
        this._cards = this._sourcedCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderAllMovies();
  }

  /* --------------------------------------------- Очищаем основной список фильмов ------------------------------------------------- */

  _clearFilmList() {
    this._allFilmsListComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
  }

  /* --------------------------------------------- Рендерим сортировку фильмов ------------------------------------------------- */

  _renderFilmSort() {
    render(siteMain, this._filmSortComponent, RenderPosition.AFTERBEGIN);
    this._filmSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  /* --------------------------------------------- Рендерим карточку фильма ------------------------------------------------- */

  _renderFilmCard(container, card) {
    const filmCardComponent = new MovieCard(card);
    const popupCardComponent = new PopupCard(card);

    const onCloseDetailsFilm = () => {
      remove(popupCardComponent);
      document.removeEventListener(`keydown`, onEscButtonKey);
    };

    const onEscButtonKey = (evt) => {
      if (evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC) {
        evt.preventDefault();
        onCloseDetailsFilm();
      }
    };

    const onFilmDetailsClick = () => {
      render(siteBody, popupCardComponent);
      popupCardComponent.setClickHandler(onCloseDetailsFilm);
      document.addEventListener(`keydown`, onEscButtonKey);
    };

    filmCardComponent.getElement().addEventListener(`click`, onFilmDetailsClick);
    render(container, filmCardComponent);
  }

  /* --------------------------------------------- Рендерим фильмы ------------------------------------------------- */

  _renderFilms(container, films, from, to) {
    films.slice(from, to)
    .forEach((card) => this._renderFilmCard(container, card));
  }

  /* --------------------------------------------- Рендерим заглушку, если нет фильмов ------------------------------------------------- */

  _renderNoFilmCard() {
    render(this._filmsComponent, this._noFilmCardComponent);
  }

  /* --------------------------------------------- Рендерим основной список фильмов ------------------------------------------------- */

  _renderAllMoviesList() {
    render(this._mainFilmListComponent, this._allFilmsListComponent);
  }

  /* --------------------------------------------- Рендерим список top rated фильмов ------------------------------------------------- */

  _renderTopRatedList() {
    this._renderFilms(this._topRatedFilmsListComponent, this._topRatedFilms, 0, this._renderedFilmsExtraCount);
  }

  /* --------------------------------------------- Рендерим список most commented фильмов ------------------------------------------------- */

  _renderMostCommentedList() {
    this._renderFilms(this._mostCommentedFilmsListComponent, this._mostCommentedFilms, 0, this._renderedFilmsExtraCount);
  }

  _handleShowMoreButtonClick() {
    this._calculateRange();
    this._renderMovies();

    if (this._renderedFilmsTo >= this._cards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  /* ---------------------------------------------Рендерим кнопку показать больше ------------------------------------------------- */

  _renderShowMoreButton() {
    render(this._mainFilmListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandlerButton(this._handleShowMoreButtonClick);
  }

  /* --------------------------------------------- Вычисляем диапазон карточек фильмов  ------------------------------------------------- */

  _calculateRange() {
    this._renderedFilmsFrom = this._renderedFilmsTo;
    this._renderedFilmsTo = Math.min(this._cards.length, (this._renderedFilmsFrom + COUNT_MOVIE_CARD_STEP));
  }

  /* --------------------------------------------- Рендерим карточки фильмов  ------------------------------------------------- */

  _renderMovies() {
    this._renderFilms(this._allFilmsListComponent, this._cards, this._renderedFilmsFrom, this._renderedFilmsTo);
  }

  /* ---------------------------------------------Рендерим основной блок с фильмами  ------------------------------------------------- */

  _renderAllMovies() {
    this._renderAllMoviesList();

    render(this._filmsComponent, this._mainFilmListComponent, RenderPosition.AFTERBEGIN);

    this._calculateRange();
    this._renderMovies();

    if (this._cards.length > COUNT_MOVIE_CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  /* --------------------------------------------- Рендерим top rated блок  ------------------------------------------------- */

  _renderTopRatedFilms() {
    this._renderTopRatedList();
    render(this._filmsComponent, this._topRatedFilmsComponent);
    render(this._topRatedFilmsComponent, this._topRatedFilmsListComponent);
  }

  /* --------------------------------------------- Рендерим most commented блок  ------------------------------------------------- */

  _renderMostCommented() {
    this._renderMostCommentedList();
    render(this._filmsComponent, this._mostcommentedFilmsComponent);
    render(this._mostcommentedFilmsComponent, this._mostCommentedFilmsListComponent);
  }

  /* ---------------------------------------------Рендерим блоки с фильмами ------------------------------------------------- */

  _renderFilmLists() {
    if (this._cards.length === 0) {
      this._renderNoFilmCard();
      return;
    }
    this._renderFilmSort();
    this._renderAllMovies();
    this._renderTopRatedFilms();
    this._renderMostCommented();
  }
}
