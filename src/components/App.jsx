// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const stat = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const per_page = 12;

export const App = () => {
  const [status, setStatus] = useState(stat.IDLE);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchFn = () => {
      setStatus(stat.PENDING);
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '34770322-1d785185ad6fb3686a5689e8d';
      const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

      fetch(ALL_URL)
        .then(res => res.json())
        .then(({ hits }) => setImages(images => [...images, ...hits]))
        .catch(error => {
          setError(error);
          setStatus(stat.REJECTED);
        })
        .finally(() => setStatus(stat.RESOLVED));
    };

    fetchFn();
  }, [query, page]);

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
      {status === stat.IDLE && <div>Введіть значення</div>}
      {status === stat.PENDING && <Loader />}
      {status === stat.RESOLVED && <ImageGallery images={images} />}
      {status === stat.REJECTED && <h1>{error.message}</h1>}
      {images.length !== 0 && images.length / per_page === page && (
        <Button onClick={onBtnClickPg} />
      )}
    </>
  );
};
