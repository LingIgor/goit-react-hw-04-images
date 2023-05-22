import React, { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export const Modal = ({ largeImageURL, alt, onClose }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    console.log('mount');
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      console.log('unmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalImg>
        <img src={largeImageURL} alt={alt} />
      </ModalImg>
    </Overlay>
  );
};
