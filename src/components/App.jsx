// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Api from '../components/API/API';
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

  // useEffect(() => {
  //   if (!query) {
  //     return;
  //   }
  //   setIsLoader(true);
  //   Api.fetchFn(page, query)
  //     .then(({ hits }) => setImages(prevState => [...prevState, ...hits]))
  //     .catch(error => {
  //       setError(error);
  //       setStatus(stat.REJECTED);
  //     });

  //   setIsLoader(false);
  // }, [page, query]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const renderImages = () => {
      setStatus(stat.PENDING);
      setIsLoader(true);
      Api.fetchFn(query, page)
        .then(data => setImages(prevState => [...prevState, ...data.hits]))
        .catch(error => {
          setError(error);
          setStatus(stat.REJECTED);
        })
        .finally(() => setStatus(stat.RESOLVED));
    };
    setIsLoader(false);
    renderImages();
    // scroll.scrollToBottom();
  }, [query, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.setState({
  //       isLoader: true,
  //     });

  //     this.fetchFn();
  //   }
  // }

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
