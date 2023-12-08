const CACHE_KEY = 'newsCache';

const getCache = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  return cachedData ? JSON.parse(cachedData) : {};
};

const setCache = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

export const getNewsFromCache = () => {
  const cache = getCache();
  return cache.news || [];
};

export const updateNewsCache = (news) => {
  const cache = getCache();
  cache.news = news;
  setCache(cache);
};
