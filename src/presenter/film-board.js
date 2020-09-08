import {getTopRatedFilms, getMostCommentedFilms} from "../mock/movie-card.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortByRating, sortByDate} from "../utils/sort-film.js";
import {SortType, COUNT_MOVIE_CARD_STEP, COUNT_MOVIE_CARD_EXTRA, FilmsType} from "../const.js";

import SiteFilms from "../view/section-films.js";
import SiteSort from "../view/sort.js";
import AllFilms from "../view/films-list.js";
import FilmListContainer from "../view/filmlist-container.js";
import TopRatedFilms from "../view/top-rated.js";
import MostcommentedFilms from "../view/most-commented.js";
import ShowMoreButton from "../view/show-more-button.js";
import NoFilmCard from "../view/no-film.js";

import FilmCard from "./film-card.js";

const siteMain = document.querySelector(`.main`);

export default class FilmBoard {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._renderedFilmsExtraCount = COUNT_MOVIE_CARD_EXTRA;
    this._currentSortType = SortType.DEFAULT;

    this._allFilmPresenter = {};
    this._topRatedFilmPresenter = {};
    this._mostCommentedFilmPresenter = {};

    this._filmSortComponent = new SiteSort();
    this._filmsComponent = new SiteFilms();
    this._noFilmCardComponent = new NoFilmCard();

    this._allMoviesComponent = new AllFilms();
    this._topRatedFilmsComponent = new TopRatedFilms();
    this._mostcommentedFilmsComponent = new MostcommentedFilms();

    this._allFilmsListComponent = new FilmListContainer();
    this._topRatedFilmsListComponent = new FilmListContainer();
    this._mostCommentedFilmsListComponent = new FilmListContainer();

    this._showMoreButtonComponent = new ShowMoreButton();

    this._renderedFilmsFrom = 0;
    this._renderedFilmsTo = 0;


    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._topRatedFilms = getTopRatedFilms(this._films);
    this._mostCommentedFilms = getMostCommentedFilms(this._films);
    this._renderFilmSort();
    render(this._movieListContainer, this._filmsComponent);
    this._renderFilmLists();
  }

  _handleModeChange() {
    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._topRatedFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._mostCommentedFilmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    const allFilmPresenter = this._allFilmPresenter[updatedFilm.id];
    const topRatedFilmPresenter = this._topRatedFilmPresenter[updatedFilm.id];
    const mostCommentedFilmPresenter = this._mostCommentedFilmPresenter[updatedFilm.id];

    if (allFilmPresenter) {
      allFilmPresenter.init(updatedFilm);
    }
    if (topRatedFilmPresenter) {
      topRatedFilmPresenter.init(updatedFilm);
    }
    if (mostCommentedFilmPresenter) {
      mostCommentedFilmPresenter.init(updatedFilm);
    }
  }

  /* --------------------------------------------- Сортируем фильмы --------------------------------------------- */

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
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

  /* --------------------------------------------- Рендерим сортировку фильмов ------------------------------------------------- */

  _renderFilmSort() {
    render(siteMain, this._filmSortComponent);
    this._filmSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  /* --------------------------------------------- Рендерим карточку фильма ------------------------------------------------- */

  _renderFilmCard(container, film, type) {
    const filmPresenter = new FilmCard(container, this._handleFilmCardChange, this._handleModeChange);
    filmPresenter.init(film);
    switch (type) {
      case FilmsType.ALL:
        this._allFilmPresenter[film.id] = filmPresenter;
        break;
      case FilmsType.TOP_RATED:
        this._topRatedFilmPresenter[film.id] = filmPresenter;
        break;
      case FilmsType.MOST_COMMENTED:
        this._mostCommentedFilmPresenter[film.id] = filmPresenter;
        break;
    }
  }

  /* --------------------------------------------- Рендерим фильмы ------------------------------------------------- */

  _renderFilms(container, films, from, to, type) {
    films.slice(from, to)
    .forEach((film) => this._renderFilmCard(container, film, type));
  }

  /* --------------------------------------------- Рендерим заглушку, если нет фильмов ------------------------------------------------- */

  _renderNoFilmCard() {
    render(this._filmsComponent, this._noFilmCardComponent);
  }

  /* ---------------------------------------------Рендерим кнопку показать больше ------------------------------------------------- */

  _renderShowMoreButton() {
    render(this._allMoviesComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandlerButton(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    this._calculateRange();
    this._renderMovies();

    if (this._renderedFilmsTo >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  /* --------------------------------------------- Вычисляем диапазон карточек фильмов  ------------------------------------------------- */

  _calculateRange() {
    this._renderedFilmsFrom = this._renderedFilmsTo;
    this._renderedFilmsTo = Math.min(this._films.length, (this._renderedFilmsFrom + COUNT_MOVIE_CARD_STEP));
  }

  /* --------------------------------------------- Рендерим карточки фильмов  ------------------------------------------------- */

  _renderMovies() {
    this._renderFilms(this._allFilmsListComponent, this._films, this._renderedFilmsFrom, this._renderedFilmsTo, FilmsType.ALL);
  }

  /* ---------------------------------------------Рендерим основной блок с фильмами  ------------------------------------------------- */

  _renderAllMovies() {
    render(this._allMoviesComponent, this._allFilmsListComponent);
    render(this._filmsComponent, this._allMoviesComponent, RenderPosition.AFTERBEGIN);

    this._calculateRange();
    this._renderMovies();

    if (this._films.length > COUNT_MOVIE_CARD_STEP) {
      this._renderShowMoreButton();
    }
  }

  /* --------------------------------------------- Рендерим top rated блок  ------------------------------------------------- */

  _renderTopRatedFilms() {
    this._renderFilms(this._topRatedFilmsListComponent, this._topRatedFilms, 0, this._renderedFilmsExtraCount, FilmsType.TOP_RATED);
    render(this._filmsComponent, this._topRatedFilmsComponent);
    render(this._topRatedFilmsComponent, this._topRatedFilmsListComponent);
  }

  /* --------------------------------------------- Рендерим most commented блок  ------------------------------------------------- */

  _renderMostCommented() {
    this._renderFilms(this._mostCommentedFilmsListComponent, this._mostCommentedFilms, 0, this._renderedFilmsExtraCount, FilmsType.MOST_COMMENTED);
    render(this._filmsComponent, this._mostcommentedFilmsComponent);
    render(this._mostcommentedFilmsComponent, this._mostCommentedFilmsListComponent);
  }

  /* --------------------------------------------- Очищаем основной список фильмов ------------------------------------------------- */

  _clearFilmList() {
    // Object.values(this._allFilmPresenter).forEach((presenter) => presenter.destroy());
    // this._allFilmPresenter = {};
    this._allFilmsListComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._renderedFilmsFrom = 0;
    this._renderedFilmsTo = 0;
  }

  /* ---------------------------------------------Рендерим блоки с фильмами ------------------------------------------------- */

  _renderFilmLists() {
    if (this._films.length === 0) {
      this._renderNoFilmCard();
      return;
    }

    this._renderAllMovies();
    this._renderTopRatedFilms();
    this._renderMostCommented();
  }
}
