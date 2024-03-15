import css from './ImageCard.module.css';

const ImageCard = ({ small, altDescription }) => {
  return (
    <>
      <img className={css.image} src={small} alt={altDescription} />
    </>
  );
};

export default ImageCard;
