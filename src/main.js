/* Моки */
import {generateFilters} from "./mock/filter.js";
import {generateMovieCards} from "./mock/movie-card.js";

/* Утилитарные */
import {render} from "./utils.js";

/* Константы */
import {COUNT_MOVIE_CARD, COUNT_MOVIE_CARD_STEP} from "./const.js";

/* Классы */
import UserProfile from "./view/user-profile.js";
import SiteFilter from "./view/filter.js";
import SiteSort from "./view/sort.js";
import SiteFilms from "./view/section-films.js";
import SectionFilmsList from "./view/films-list.js";
import FilmListContainer from "./view/filmlist-container.js";
import TopRatedFilms from "./view/top-rated.js";
import MostcommentedFimls from "./view/most-commented";
import MovieCard from "./view/movie-card.js";
import PopupCard from "./view/popup.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistic from "./view/footer-statistic.js";

const filmsComponent = new SiteFilms();
const filmListComponent = new SectionFilmsList();
const filmListContainerComponent = new FilmListContainer();
const topRatedFilmsComponent = new TopRatedFilms();
const MostcommentedFilmsComponent = new MostcommentedFimls();

const quantityMovies = `130 291`;
const siteBody = document.querySelector(`body`);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistic = footer.querySelector(`.footer__statistics`);
const cards = generateMovieCards(COUNT_MOVIE_CARD);
// const topRatedFilms = getTopRatedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
// const mostCommentedFilms = getMostCommentedFilms(cards, COUNT_MOVIE_CARD_EXTRA);
const filters = generateFilters(cards);
// const popup = generateMovieCards();

const renderCard = (container, card) => {
  const movieCardComponent = new MovieCard(card);
  const popupCardComponent = new PopupCard(card);

  const onCloseButtonClick = () => {
    popupCardComponent.getElement().remove();
    popupCardComponent.removeElement();
  };

  const onFilmDetailsClick = () => {
    render(siteBody, popupCardComponent.getElement());

    popupCardComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);
  };

  movieCardComponent.getElement().addEventListener(`click`, (evt) => {
    const target = evt.target;
    const filmTitle = target.closest(`.film-card__title`);
    const filmPoster = target.closest(`.film-card__poster`);
    const filmComment = target.closest(`.film-card__comments`);

    if (filmTitle || filmPoster || filmComment) {
      onFilmDetailsClick();
    }
  });

  render(container, movieCardComponent.getElement());
};

render(siteHeader, new UserProfile().getElement());
render(siteMain, new SiteFilter(filters).getElement());
render(siteMain, new SiteSort().getElement());
render(footerStatistic, new FooterStatistic(quantityMovies).getElement());

render(siteMain, filmsComponent.getElement());
render(filmsComponent.getElement(), filmListComponent.getElement());
render(filmListComponent.getElement(), filmListContainerComponent.getElement());

const count = Math.min(cards.length, COUNT_MOVIE_CARD_STEP);
for (let i = 1; i <= count; i++) {
  renderCard(filmListContainerComponent.getElement(), cards[i]);
}

render(filmsComponent.getElement(), new TopRatedFilms().getElement());
render(filmsComponent.getElement(), new MostcommentedFimls().getElement());
render(topRatedFilmsComponent.getElement(), new FilmListContainer().getElement());
render(MostcommentedFilmsComponent.getElement(), new FilmListContainer().getElement());

if (cards.length > COUNT_MOVIE_CARD_STEP) {
  let renderedCardCount = COUNT_MOVIE_CARD_STEP;
  const showMoreComponent = new ShowMoreButton();
  render(filmListComponent.getElement(), showMoreComponent.getElement());

  showMoreComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards.slice(renderedCardCount, renderedCardCount + COUNT_MOVIE_CARD_STEP)
    .forEach((card) => renderCard(filmListContainerComponent.getElement(), card));

    renderedCardCount += COUNT_MOVIE_CARD_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreComponent.getElement().remove();
      showMoreComponent.removeElement();
    }
  });
}
