// import axios from 'axios';
import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    status: 'idle',
    images: [],
    query: null,
    page: 1,
    per_page: 12,
    error: null,
    isLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoader: true,
      });

      this.fetchFn();
    }
  }

  fetchFn = () => {
    const { query, page, per_page } = this.state;
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34770322-1d785185ad6fb3686a5689e8d';
    const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    fetch(ALL_URL)
      .then(res => res.json())
      .then(({ hits }) =>
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          isLoader: false,
        }))
      )
      .catch(error => this.setState({ error, status: status.REJECTED }))
      .finally(() => this.setState({ status: status.RESOLVED }));
  };

  onBtnClickPg = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
    });
  };

  render() {
    const { onSubmit, onBtnClickPg } = this;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {this.state.status === 'idle' && <div>Введіть значення</div>}
        {this.state.isLoader && <Loader />}
        {this.state.status === 'resolved' && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.status === 'rejected' && (
          <h1>{this.state.error.message}</h1>
        )}

        {this.state.images.length !== 0 && <Button onClick={onBtnClickPg} />}
      </>
    );
  }
}
