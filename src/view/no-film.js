
import AbstractView from "./abstract.js";

const createNoFilmCardTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoFilmCard extends AbstractView {
  getTemplate() {
    return createNoFilmCardTemplate();
  }
}
