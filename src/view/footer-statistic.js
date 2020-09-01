import Abstract from "./abstract.js";

const createFooterStatisticTemplate = (quantityMovies) => `<p>${quantityMovies} movies inside</p>`;

export default class FooterStatistic extends Abstract {
  constructor(quantityMovies) {
    super();
    this._quantityMovies = quantityMovies;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._quantityMovies);
  }
}
