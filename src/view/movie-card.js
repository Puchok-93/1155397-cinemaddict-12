export const createMovieCardTemplate = (card) => {
  const {title, year, poster, genre, isWatch, isHistory, isFavorite, duration, comments, description, raiting} = card;

  const isWatchClassName = isWatch ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isHistoryClassName = isHistory ? `film-card__controls-item--active` : `film-card__controls-item`;
  const isFavoriteClassName = isFavorite ? `film-card__controls-item--active` : `film-card__controls-item`;

  const numberOfComments = comments !== 1 ? comments + ` comments` : comments + ` comment`;
  const maxDescriptionLength = 140;
  const descriptionPreview = description.length > maxDescriptionLength ? `${description.slice(0, 140)}...` : description;

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${raiting}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionPreview}</p>
    <a class="film-card__comments">${numberOfComments}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchClassName}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isHistoryClassName}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}">Mark as favorite</button>
    </form>
  </article>`
  );
};
