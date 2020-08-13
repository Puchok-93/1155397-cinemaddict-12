const addFilteredFilmsCount = (filter, check) => {
  return (check) ? (filter || 0) + 1 : filter || 0;
};

export const generateFilters = (cards) => {
  if (cards.length === 0) {
    return {
      watchlist: 0,
      history: 0,
      favorites: 0
    };
  }

  return cards.reduce((filter, card) => {
    filter.watchlist = addFilteredFilmsCount(filter.watchlist, card.isWatch);
    filter.history = addFilteredFilmsCount(filter.history, card.isHistory);
    filter.favorites = addFilteredFilmsCount(filter.favorites, card.isFavorites);

    return filter;
  }, {});
};
