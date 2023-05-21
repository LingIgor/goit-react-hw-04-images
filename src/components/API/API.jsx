function fetchFn(page, query) {
  const per_page = 12;
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34770322-1d785185ad6fb3686a5689e8d';
  const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

  return fetch(ALL_URL).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Сталася помилка.'));
  });
}

const api = {
  fetchFn,
};

export default api;
