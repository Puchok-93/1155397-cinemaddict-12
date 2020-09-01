import Abstract from "./abstract.js";

const createFilmDetailsTemplate = () => {
  return (
    `<section class="film-details"></section>`
  );
};

export default class FilmDetails extends Abstract {
  getTemplate() {
    return createFilmDetailsTemplate();
  }
}
