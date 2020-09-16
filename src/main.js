import UserProfile from "./view/user-profile.js";
import FilmBoardPresenter from "./presenter/film-board.js";
import FilterPresenter from "./presenter/filter.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {render} from "./utils/render.js";
import {generateMovieCards} from "./mock/movie-card.js";
import {COUNT_MOVIE_CARD} from "./const.js";
import FooterStatistic from "./view/footer-statistic.js";

const cards = generateMovieCards(COUNT_MOVIE_CARD);
const quantityMovies = cards.length;

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);
const commentsModel = new CommentsModel();
commentsModel.setComments(cards);
const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const filmBoardPresenter = new FilmBoardPresenter(main, moviesModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, moviesModel);

render(header, new UserProfile());
filmBoardPresenter.init();
filterPresenter.init();
render(footerStatistic, new FooterStatistic(quantityMovies));
