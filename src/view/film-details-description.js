import AbstractView from "./abstract.js";
import {dateFilm, durationFilm} from "../utils/films.js";

const createGenresTemplate = (genresFilm) => {

  const genresList = genresFilm.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  });

  const genresTitle = (genresList.length > 1) ? `Genres` : `Genre`;

  return (`<tr class="film-details__row">
    <td class="film-details__term">${genresTitle}</td>
    <td class="film-details__cell">
     ${genresList.join(``)}
    </td>
  </tr>`
  );
};

const createFilmDetailsDescription = (data) => {
  const {title, poster, description, rating, duration, genres, age, director, writers, actors, date, country, isWatchList, isWatched, isFavorite} = data;
  const genresTemplate = createGenresTemplate(genres);
  return (
    `<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="${title}">

    <p class="film-details__age">${age}</p>
  </div>

  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${title}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers.join(`, `)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors.join(`, `)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${dateFilm(date, true)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${durationFilm(duration)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
      </tr>
      ${genresTemplate}
    </table>

    <p class="film-details__film-description">
      ${description}
    </p>
  </div>
</div>

<section class="film-details__controls">
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchList ? `checked` : ``}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
</section>`
  );
};

export default class DetailsDescription extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {

    return createFilmDetailsDescription(this._data);
  }
}
