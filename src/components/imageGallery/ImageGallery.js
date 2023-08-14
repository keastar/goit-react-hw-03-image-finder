import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from '../Modal/Modal';
import ErrorView from '../ImageGalleryItem/ErrorView';
import Loading from '../ImageGalleryItem/Loading';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import fetchImages from '../api/api';

export default class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    showModal: false,
    isLoading: false,
    selectedImg: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const KEY_API = `38437230-a55c844227541f1a03bd232fe`;
    const URL = `https://pixabay.com/api/`;
    const nowName = this.props.searchImgName;
    const prevName = prevProps.searchImgName;
    const currentPage = this.state;

    if (nowName !== prevName) {
      this.setState({ status: 'pending' });

      fetch(
        `${URL}?key=${KEY_API}&q=${nowName}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          return response.json();
        })

        .then(result =>
          this.setState({
            images: result.hits,
            status: 'resolved',
          })
        )

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  getImages = async () => {
    const { currentPage } = this.state;
    const nowName = this.props.searchImgName;

    this.setState({
      isLoading: true,
      status: 'pending',
    });

    try {
      const { hits } = await fetchImages(nowName, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
        // status: 'resolved',
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      console.log('thmsn wrong!', new Error(`Нет картинки: ${nowName}`));
      this.setState({ error, status: 'rejected' });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  // handleLoadMore = e => {
  //   this.setState(prevState => ({
  //     // images: [...prevState.images, ...images],
  //     currentPage: prevState.currentPage + 1,
  //   }));
  // };

  openModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectImgHandle = largeImageURL => {
    this.setState({ selectedImg: largeImageURL, showModal: true });
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { showModal, images, selectedImg, status, error } = this.state;
    const loadMoreBtn = images.length > 0 && images.length >= 12;

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
              <img src={selectedImg} alt={images.tags} className={css.modal} />
            </Modal>
          )}
          <ul className={css.gallery}>
            {images.map(image => (
              <ImageGalleryItem image={image} onClick={this.selectImgHandle} />
            ))}
          </ul>
          {loadMoreBtn && <Button onClick={this.getImages} />}
        </>
      );
    }
  }
}
ImageGallery.propTypes = {
  searchImgName: PropTypes.element,
  image: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
