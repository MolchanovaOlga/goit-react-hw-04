import css from './ImageCard.module.css';

const ImageCard = ({ items }) => {
  console.log(items);
  const {
    urls: { small, regular },
    description,
    alt_description,
    likes,
    user: { name, location },
  } = items;
  return (
    <>
      <img className={css.image} src={small} alt={alt_description} />
      <div className={css.container}>
        <div className={css.userContainer}>
          <p>
            <span className={css.span}>{name}</span>
          </p>
          <p>{location}</p>
        </div>
        <p>
          Likes: <span className={css.span}>{likes}</span>
        </p>
      </div>
    </>
  );
};

export default ImageCard;
