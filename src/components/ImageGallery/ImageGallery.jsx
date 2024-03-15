import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items }) => {
  // const {
  //   urls: { regular },
  //   description,
  //   likes,
  //   user: { name, location },
  // } = items;
  return (
    <ul className={css.list}>
      {items.map(({ id, urls: { small }, alt_description }) => {
        return (
          <li className={css.item} key={id}>
            <ImageCard small={small} altDescription={alt_description} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
