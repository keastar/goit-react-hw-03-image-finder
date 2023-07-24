// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = () => {
  return (
    <>
      <ul className={css.gallery}></ul>
    </>
  );
};

ImageGallery.propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
};
export default ImageGallery;
