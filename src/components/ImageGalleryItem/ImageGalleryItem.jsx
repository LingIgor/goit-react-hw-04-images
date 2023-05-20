import React, { Component } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { src, alt, largeImageURL } = this.props;
    const { showModal } = this.state;
    const { toggleModal } = this;
    return (
      <Item>
        <Img onClick={toggleModal} src={src} alt={alt} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
        )}
      </Item>
    );
  }
}
