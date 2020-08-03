import {createUserProfileTemplate} from "./view/user-profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createSectionMoviesElementTemplate} from "./view/section-movies-elements.js";
import {createMovieCardTemplate} from "./view/movie-card.js";
import {createSecionMoviesTemplate} from "./view/section-movies.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";


const COUNT_MOVIE_CARD = 4;
const COUNT_MOVIE_CARD_EXTRA = 2;
const quantityMovies = `130 291`;
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

/* ----- Рендер ----- */

render(siteHeader, createUserProfileTemplate());
render(siteMain, createNavigationTemplate());
render(siteMain, createSortTemplate());
render(siteMain, createSecionMoviesTemplate());
render(footerStatistic, createFooterStatisticTemplate(quantityMovies));

const sectionFilms = siteMain.querySelector(`.films`);

render(sectionFilms, createSectionMoviesElementTemplate());

const filmsList = sectionFilms.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);
const filmsListsExtra = sectionFilms.querySelectorAll(`.films-list--extra`);

for (let i = 0; i <= COUNT_MOVIE_CARD; i++) {
  render(filmsListContainer, createMovieCardTemplate());
}

render(filmsList, createShowMoreButtonTemplate());

for (let y = 0; y < filmsListsExtra.length; y++) {
  const filmsListExtra = filmsListsExtra[y];
  const filmsListExtraContainer = filmsListExtra.querySelector(`.films-list__container`);

  for (let i = 0; i < COUNT_MOVIE_CARD_EXTRA; i++) {
    render(filmsListExtraContainer, createMovieCardTemplate());
  }
}
