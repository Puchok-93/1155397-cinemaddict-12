import {generateFilters} from "./mock/filter.js";
import {generateMovieCards} from "./mock/movie-card.js";
import {render} from "./utils/render.js";
import {COUNT_MOVIE_CARD} from "./const.js";

import UserProfile from "./view/user-profile.js";
import SiteFilter from "./view/filter.js";
import SiteSort from "./view/sort.js";
import FooterStatistic from "./view/footer-statistic.js";
import FilmBoard from "./presenter/film-board.js";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics`);

const filmBoardPresenter = new FilmBoard(siteMain);

const cards = generateMovieCards(COUNT_MOVIE_CARD);
const filters = generateFilters(cards);
const quantityMovies = cards.length;

render(siteHeader, new UserProfile());
render(siteMain, new SiteFilter(filters));
render(siteMain, new SiteSort());
render(footerStatistic, new FooterStatistic(quantityMovies));

filmBoardPresenter.init(cards);

