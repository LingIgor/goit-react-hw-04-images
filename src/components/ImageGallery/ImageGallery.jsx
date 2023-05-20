import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallerys } from './ImageGallery.styled';
// import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGallerys className="ImageGallery">
      {images.map(({ webformatURL, tags, largeImageURL, id }) => (
        <ImageGalleryItem
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          key={id}
        />
      ))}
    </ImageGallerys>
  );
};
