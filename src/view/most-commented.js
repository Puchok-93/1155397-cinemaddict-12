import Abstract from "./abstract.js";

const createMostcommentedFimlsTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class MostcommentedFilms extends Abstract {
  getTemplate() {
    return createMostcommentedFimlsTemplate();
  }
}
