// import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from '../Modal/Modal';
import ErrorView from '../ImageGalleryItem/ErrorView';
import Loading from '../ImageGalleryItem/Loading';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    showModal: false,
    selectedImg: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const KEY_API = `38437230-a55c844227541f1a03bd232fe`;
    const URL = `https://pixabay.com/api/`;
    const nowName = this.props.searchImgName;
    const prevName = prevProps.searchImgName;

    if (prevName !== nowName) {
      console.log('Изменилось поисковое имя запроса');
      console.log(prevName);
      console.log(nowName);

      this.setState({ status: 'pending' });

      fetch(
        `${URL}?key=${KEY_API}&q=${nowName}&image_type=photo&orientation=horizontal&per_page=15`
      )
        .then(response => {
          // if (response.ok) {
          return response.json();
          // } else {
          //   return Promise.rejected(new Error(`Нет картинки: ${nowName}`));
          // }
        })
        .then(result =>
          this.setState({ images: result.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

      // localStorage.setItem('photos', JSON.stringify(this.state.images));
    }
  }
  openModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectImgHandle = largeImageURL => {
    this.setState({ selectedImg: largeImageURL, showModal: true });
  };

  render() {
    const { showModal, images, selectedImg, status, error } = this.state;
    if (status === 'idle') {
      return <div>Введите поисковое название</div>;
    }
    if (status === 'pending') {
      return <Loading />;
    }
    if (status === 'rejected') {
      return <ErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.openModal}>
              <img
                src={selectedImg}
                onClick={this.openModal}
                className={css.modal}
              />
            </Modal>
          )}
          <ul className={css.gallery}>
            {images.map(image => (
              <ImageGalleryItem image={image} onClick={this.selectImgHandle} />
            ))}
          </ul>
        </>
      );
    }
  }
}
// ImageGallery.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
