// import PropTypes from 'prop-types';
// import { Component } from 'react';
import css from './ImageGallery.module.css';
// import ErrorView from '../ImageGalleryItem/ErrorView';
// import Loading from '../ImageGalleryItem/Loading';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

// export default class ImageGallery extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//     showModal: false,
//     largeImage: '',
//   };

// componentDidUpdate(prevProps, prevState) {
//   const KEY_API = `38437230-a55c844227541f1a03bd232fe`;
//   const URL = `https://pixabay.com/api/`;
//   const nowName = this.props.searchImgName;
//   const prevName = prevProps.searchImgName;

//   if (prevName !== nowName) {
//     console.log('Изменилось поисковое имя запроса');
//     console.log(prevName);
//     console.log(nowName);

//     this.setState({ status: 'pending' });

//     fetch(
//       `${URL}?key=${KEY_API}&q=${nowName}&image_type=photo&orientation=horizontal&per_page=15`
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return Promise.rejected(new Error(`Нет картинки: ${nowName}`));
//         }
//       })

//       .then(result =>
//         this.setState({ images: result.hits, status: 'resolved' })
//       )
//       .catch(error => this.setState({ error, status: 'rejected' }));

//     // localStorage.setItem('photos', JSON.stringify(this.state.images));
//   }
// }

// openModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };
const ImageGallery = ({ images, onImageClick }) => (
  // render() {
  // const { images } = this.state;
  // const { onImageClick } = this.props;
  // console.log({ images });

  // const { onClick } = this.props;

  <ul className={css.gallery}>
    {images.map(image => {
      return (
        <ImageGalleryItem
          image={image}
          onImageClick={onImageClick}
          key={image.id}
          className={css.gallery_item}
        />
      );
    })}
  </ul>
);

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     })
//   ),
//   onImageClick: PropTypes.func.isRequired,
// };

export default ImageGallery;
