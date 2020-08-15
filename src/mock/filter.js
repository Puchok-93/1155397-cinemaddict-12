const addFilteredFilmsCount = (filter, card) => {
  if (card.isWatch) {
    filter.watchlist++;
  }
  if (card.isHistory) {
    filter.history++;
  }
  if (filter.isFavorites) {
    filter.favorites++;
  }
};

export const generateFilters = (cards) => {
  const filter = {
    watchlist: 0,
    history: 0,
    favorites: 0
  };

  cards.forEach((card) => {
    addFilteredFilmsCount(filter, card);
  });

  return filter;
};
