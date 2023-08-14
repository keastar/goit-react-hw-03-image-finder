import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Container from './Container';
import fetchImages from 'api/api';
import Loading from './ImageGalleryItem/Loading';
import ErrorView from './ImageGalleryItem/ErrorView';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchImgName: '',
    showModal: false,
    largeImageURL: null,
    error: null,
    isLoading: false,
    total: 0,
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchImgName, currentPage } = this.state;
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchImgName !== prevState.searchImgName
    ) {
      this.getImgs(searchImgName, currentPage);
    }
  }

  getImgs = async (searchImgName, currentPage) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchImages(searchImgName, currentPage);
      if (hits.length === 0) {
        return alert('Not found!');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  handleFormSubmit = searchImgName => {
    //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
    this.setState({
      searchImgName: searchImgName,
      images: [],
      currentPage: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '', tags: '' });
  };

  render() {
    const { images, total, showModal, error, isLoading, largeImageURL, tags } =
      this.state;
    const totalPage = total / images.length;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loading />}
        {error && <ErrorView message={error.message} />}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.openModal} />
        )}
        {totalPage > 1 && !isLoading && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={this.closeModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </Container>
    );
  }
}
