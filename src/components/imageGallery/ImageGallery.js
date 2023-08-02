// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className={css.gallery}>{children}</ul>
    </>
  );
};

// ImageGallery.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
export default ImageGallery;
