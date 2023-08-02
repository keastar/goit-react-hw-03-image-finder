// import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import ErrorView from './ErrorView';
import Loading from './Loading';

export default class ImageGalleryItem extends Component {
  state = {
    images: [],
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
          if (response.ok) {
            return response.json();
          } else {
            return Promise.rejected(new Error(`Нет картинки: ${nowName}`));
          }
        })
        .then(result =>
          this.setState({ images: result.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, status, error } = this.state;
    const { searchImgName } = this.props;

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
      return images.map(image => (
        <li key={image.id} className={css.gallery_item}>
          <img
            src={image.previewURL}
            alt={searchImgName}
            className={css.gallery_item_image}
          />
        </li>
      ));
    }
  }
}
