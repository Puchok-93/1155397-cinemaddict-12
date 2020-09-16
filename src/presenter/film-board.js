import FilmPresenter from "./film-card.js";
import SortView from "../view/sort.js";
import FilmsView from "../view/section-films.js";
import NoFilmCardView from "../view/no-film.js";
import AllFilmsView from "../view/films-list.js";
import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmsListView from "../view/filmlist-container.js";
import ShowButtonView from "../view/show-more-button.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {filterRules} from "../utils/filter.js";
import {sortByRating, sortByCommentsCount, sortByDate} from "../utils/sort-film.js";
import {SortType, FilmsType, UserAction, UpdateType, COUNT_MOVIE_CARD_STEP, COUNT_MOVIE_CARD_EXTRA} from "../const.js";

export default class FilmBoard {
  constructor(movieListContainer, moviesModel, commentsModel, filterModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._allFilmPresenter = {};
    this._topRatedFilmPresenter = {};
    this._mostCommentedFilmPresenter = {};

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._noFilmCardComponent = new NoFilmCardView();

    this._allMoviesComponent = new AllFilmsView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();

    this._allMoviesListComponent = new FilmsListView();
    this._topRatedListComponent = new FilmsListView();
    this._mostCommentedListComponent = new FilmsListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._movieListContainer, this._filmsComponent);
    this._renderMovieList();
  }

  _getFilms() {
    const currentFilter = this._filterModel.getFilter();
    const films = this._moviesModel.getMovies();
    const filteredFilms = films.filter((film) => filterRules[currentFilter](film));

    switch (this._currentSortType) {
      case SortType.DATE:
        return sortByDate(filteredFilms.slice());
      case SortType.RATING:
        return sortByRating(filteredFilms.slice());
      default:
        return filteredFilms;
    }
  }

  _getTopRatedFilms() {
    return sortByRating(this._moviesModel.getMovies().slice());
  }

  _getMostCommentedFilms() {
    return sortByCommentsCount(this._moviesModel.getMovies().slice());
  }

  _handleModeChange() {
    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._topRatedFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._mostCommentedFilmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, updatedData, filmID) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._moviesModel.updateMovie(updateType, updatedData);
        break;
      case UserAction.ADD:
        this._commentsModel.addComment(updateType, updatedData, filmID);
        break;
      case UserAction.DELETE:
        this._commentsModel.deleteComment(updateType, updatedData, filmID);
        break;
    }
  }

  _handleModelEvent(updateType, updatedFilm) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._allFilmPresenter[updatedFilm.id]) {
          this._allFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        if (this._topRatedFilmPresenter[updatedFilm.id]) {
          this._topRatedFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        if (this._mostCommentedFilmPresenter[updatedFilm.id]) {
          this._mostCommentedFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderMovieList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearMovieList({resetAllMoviesOnly: true, resetRenderedFilmsCount: true});
    this._renderSorting();
    this._renderAllMoviesList();
  }

  _renderSorting() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFORE, this._filmsComponent);
  }

  _renderFilmCard(container, film, type) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange, this._commentsModel);
    filmPresenter.init(film);
    switch (type) {
      case FilmsType.ALL:
        this._allFilmPresenter[film.id] = filmPresenter;
        break;
      case FilmsType.RATED:
        this._topRatedFilmPresenter[film.id] = filmPresenter;
        break;
      case FilmsType.COMMENTED:
        this._mostCommentedFilmPresenter[film.id] = filmPresenter;
        break;
    }
  }

  _renderFilmCards(container, films, type) {
    films.forEach((film) => this._renderFilmCard(container, film, type));
  }

  _renderNoMovies() {
    render(this._filmsComponent, this._noFilmCardComponent, RenderPosition.AFTERBEGIN);
  }

  _renderAllMoviesList() {
    const films = this._getFilms();
    const filmsCount = films.length;
    const allFilms = films.slice(0, Math.min(filmsCount, this._renderedFilmsCount));

    this._renderFilmCards(this._allMoviesListComponent, allFilms, FilmsType.ALL);
    render(this._allMoviesComponent, this._allMoviesListComponent);

    if (filmsCount > this._renderedFilmsCount) {
      this._renderShowButton();
    }
  }

  _renderTopRatedList() {
    const topRatedFilms = this._getTopRatedFilms().slice(0, COUNT_MOVIE_CARD_EXTRA);
    this._renderFilmCards(this._topRatedListComponent, topRatedFilms, FilmsType.RATED);
    render(this._topRatedComponent, this._topRatedListComponent);
  }

  _renderMostCommentedList() {
    const mostCommentedFilms = this._getMostCommentedFilms().slice(0, COUNT_MOVIE_CARD_EXTRA);
    this._renderFilmCards(this._mostCommentedListComponent, mostCommentedFilms, FilmsType.COMMENTED);
    render(this._mostCommentedComponent, this._mostCommentedListComponent);
  }

  _handleShowButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + COUNT_MOVIE_CARD_STEP);
    const addFilmsCount = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);


    this._renderFilmCards(this._allMoviesListComponent, addFilmsCount, FilmsType.ALL);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowButtonView();
    render(this._allMoviesComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setShowButtonClickHandler(this._handleShowButtonClick);
  }

  _renderAllMovies() {
    this._renderAllMoviesList();
    render(this._filmsComponent, this._allMoviesComponent);
  }

  _renderTopRated() {
    this._renderTopRatedList();
    render(this._filmsComponent, this._topRatedComponent);
  }

  _renderMostCommented() {
    this._renderMostCommentedList();
    render(this._filmsComponent, this._mostCommentedComponent);
  }

  _clearMovieList({resetAllMoviesOnly = false, resetRenderedFilmsCount = false, resetSortType = false} = {}) {

    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.destroy());
    this._allFilmPresenter = {};

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = COUNT_MOVIE_CARD_STEP;
    }

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);

    if (resetAllMoviesOnly) {
      return;
    }

    Object.values(this._topRatedFilmPresenter).forEach((presenter) => presenter.destroy());
    Object.values(this._mostCommentedFilmPresenter).forEach((presenter) => presenter.destroy());

    this._topRatedFilmPresenter = {};
    this._mostCommentedFilmPresenter = {};

    remove(this._noFilmCardComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderMovieList() {
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderSorting();
    this._renderAllMovies();
    this._renderTopRated();
    this._renderMostCommented();
  }
}
