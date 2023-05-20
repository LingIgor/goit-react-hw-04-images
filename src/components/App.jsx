export const App = () => {
  useEffect(() => {
    if (query === '') return;
    console.log('use');
    setIsLoader(true);
    fetchFn();
  }, [query, page]);

  const fetchFn = () => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34770322-1d785185ad6fb3686a5689e8d';
    const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    fetch(ALL_URL)
      .then(res => res.json())
      .then(({ hits }) => {
        setImages([...images, ...hits]);
        setIsLoader(false);
      })
      .catch(error => {
        setError(error);
        setStatus(stat.REJECTED);
      })
      .finally(() => setStatus(stat.RESOLVED));
  };

  const onBtnClickPg = () => {
    setPage(page + 1);
  };

  const onSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {stat === 'idle' && <div>Введіть значення</div>}
      {isloader && <Loader />}
      {stat === 'resolved' && <ImageGallery images={images} />}
      {stat === 'rejected' && <h1>{error.message}</h1>}

      {images.length !== 0 && images.length / 12 === page && (
        <Button onClick={onBtnClickPg} />
      )}
    </>
  );
};
