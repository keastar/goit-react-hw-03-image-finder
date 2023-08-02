// import PropTypes from 'prop-types';
import { Component } from 'react';
// import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const KEY_API = `38437230-a55c844227541f1a03bd232fe`;
    const URL = `https://pixabay.com/api/`;
    // const prevName = prevProps.searchImgName;
    // const nextName = this.props.searchImgName;

    // if (prevName !== nextName) {
    // console.log('Изменилось поисковое имя запроса');

    this.setState({ loading: true });

    fetch(
      `${URL}?key=${KEY_API}&q=yellow+flowers&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            loading: true,
            images: result.hits,
          });
        },
        error => {
          this.setState({
            loading: true,
            error,
          });
        }
      );
    // }
  }

  render() {
    const { images, loading, error } = this.state;
    // const { searchImgName } = this.props;
    if (error) {
      return <p> Error {error.message} </p>;
    } else if (!loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {images.map(image => (
            <li key={image.id}>
              {image.tags}
              <img src={image.previewURL} alt="" />
            </li>
          ))}
        </ul>
      );
    }
    // { (!error) && <p> Error {error.message} </p> }
    // { loading && <div>Loading...</div> }
    // { !searchImgName && <div>Введите поисковое слово</div> }
    //   { images && <p>{images.hits}</p>  }
    // <li className={css.gallery_item}>
    // {
    /* <img src="" alt="Image flower" className={css.gallery_item_image} /> */
    // }
    // </li>
    // );
  }

  // ImageGalleryItem.propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
}
