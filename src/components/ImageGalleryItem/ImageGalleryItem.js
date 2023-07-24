// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = () => {
  return (
    <li class={css.gallery_item}>
      <img src="" alt="Image flower" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
