const filter = {
  Watchlist: 0,
  History: 0,
  Favorites: 0
};

export const generateFilter = (cards) => {

  cards.forEach((card) => {
    if (card.isWatch) {
      filter.Watchlist++;
    } else if (card.isHistory) {
      filter.History++;
    } else if (card.isFavorite) {
      filter.Favorites++;
    }
  });

  return Object.entries(filter).map(([filterName, countCards]) => {
    return {
      name: filterName,
      count: countCards
    };
  });
};
