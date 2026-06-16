const STORAGE_KEY = "anicronologic_favorites";

export function readFavorites() {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
}

export function writeFavorites(favorites) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavoriteAnime(malId, favorites = []) {
  return favorites.some((favorite) => favorite.mal_id === malId);
}

export function getFavoritePayload(anime) {
  return {
    mal_id: anime.mal_id,
    title: anime.title,
    images: anime.images,
    score: anime.score,
    year: anime.year,
    episodes: anime.episodes,
  };
}

export function toggleFavoriteAnime(anime, favorites = []) {
  if (isFavoriteAnime(anime.mal_id, favorites)) {
    return favorites.filter((favorite) => favorite.mal_id !== anime.mal_id);
  }

  return [...favorites, getFavoritePayload(anime)];
}
