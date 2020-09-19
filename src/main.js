import UserProfileView from "./view/user-profile.js";
import FooterStatisticView from "./view/footer-statisctic.js";
import {generateMovieCards} from "./mock/movie-card.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilmBoardPresenter from "./presenter/film-board.js";
import FilterPresenter from "./presenter/filter.js";
import {COUNT_MOVIE_CARD} from "./const.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const films = generateMovieCards(COUNT_MOVIE_CARD);
const moviesModel = new MovieModel();
moviesModel.setMovies(films);
const filtersModel = new FilterModel();

const filterPresenter = new FilterPresenter(main, filtersModel, moviesModel);
const filmBoardPresenter = new FilmBoardPresenter(main, moviesModel, filtersModel);

render(header, new UserProfileView(), RenderPosition.BEFOREEND);
filterPresenter.init();
filmBoardPresenter.init();
render(footer, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
