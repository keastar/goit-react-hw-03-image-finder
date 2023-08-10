// import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { onClick, image } = this.props;
    console.log('fdgdssfgdfgd', image);

    return (
      <li key={image.id} className={css.gallery_item}>
        <img
          src={image.previewURL}
          alt={image.tags}
          className={css.gallery_item_image}
          onClick={() => onClick(image.largeImageURL)}
        />
      </li>
    );
  }
}
