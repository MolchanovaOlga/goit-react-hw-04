import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items }) => {
  return (
    <ul>
      {items.map(
        ({
          id,
          urls: { small, regular },
          alt_description,
          description,
          likes,
          user: { name, location },
        }) => {
          return (
            <li key={id}>
              <img src={small} alt={alt_description} />
            </li>
          );
        }
      )}
    </ul>
  );
};

export default ImageGallery;
