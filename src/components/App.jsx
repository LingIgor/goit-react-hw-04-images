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

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(
    prev => {
      if (prev !== query) {
        setIsLoader(true);
        fetchFn();
      }
    },
    [page, query]
  );

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.setState({
  //       isLoader: true,
  //     });

  //     this.fetchFn();
  //   }
  // }

  async function fetchFn() {
    const per_page = 12;
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34770322-1d785185ad6fb3686a5689e8d';
    const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    try {
      try {
        const res = await fetch(ALL_URL);
        const { hits } = await res.json();
        setImages([...images, ...hits]);
        setIsLoader(false);
      } catch (error) {
        setError(error);
        setStatus(stat.REJECTED);
      }
    } finally {
      return setStatus(stat.RESOLVED);
    }
  }

  fetchFn();

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
      {status === 'idle' && <div>Введіть значення</div>}
      {isLoader && <Loader />}
      {status === 'resolved' && <ImageGallery images={images} />}
      {status === 'rejected' && <h1>{error.message}</h1>}

      {images.length !== 0 && <Button onClick={onBtnClickPg} />}
    </>
  );
};
