const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

async function fetchJikanResponse(path) {
  const res = await fetch(`${JIKAN_BASE_URL}${path}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Falha ao buscar dados da Jikan em ${path} (${res.status})`);
  }

  const data = await res.json();
  return data.data;
}

async function fetchJikanList(path) {
  return (await fetchJikanResponse(path)) || [];
}

async function fetchJikanItem(path) {
  return (await fetchJikanResponse(path)) || null;
}

export function getTrendingAnimes(limit = 20) {
  return fetchJikanList(`/top/anime?sfw=true&limit=${limit}`);
}

export function getCurrentSeason(limit = 24) {
  return fetchJikanList(`/seasons/now?sfw=true&limit=${limit}`);
}

export function getTopAnimes(limit = 24) {
  return fetchJikanList(`/top/anime?sfw=true&limit=${limit}`);
}

export function getGenres() {
  return fetchJikanList("/genres/anime");
}

export function searchAnimes(query) {
  if (!query.trim()) {
    return Promise.resolve([]);
  }

  return fetchJikanList(`/anime?q=${encodeURIComponent(query)}&sfw=true`);
}

export function getAnimeDetails(id) {
  return fetchJikanItem(`/anime/${id}/full`);
}
