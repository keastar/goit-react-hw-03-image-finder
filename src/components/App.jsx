import React, { Component } from "react";
// import Modal from "./Modal/Modal";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Container from './Container';
import Modal from './Modal/Modal';
import Button from "./Button/Button";
import fetchImages from './api/api';
import Loading from './ImageGalleryItem/Loading';


export default class App extends Component {
   state = {
     images: [],
     currentPage: 1,
     searchImgName: '',
     showModal: false,
     isLoading: false,
     largeImage: '',
     error: null,
     status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const nowName = this.state.searchImgName;
    const prevName = prevState.searchImgName;

    if (prevName !== nowName) {
      console.log('Изменилось поисковое имя запроса');
      console.log(prevName);
      console.log(nowName);
      this.setState({ status: 'pending' });
      this.getImages();
    }
  }

 // Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки ключи из стейта
    onChangeQuery = query => {
      this.setState({
      images: [],
      currentPage: 1,
      searchImgName: query,
      error: null,
    });
    };

// Получаем дату из фетча
  getImages = async () => {
    const { currentPage, searchImgName } = this.state;

    this.setState({
      isLoading: true,
      status: 'pending',
    });

    try {
      const { hits } = await fetchImages(searchImgName, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    }
    catch (error) {
      
      console.log('Smth wrong with App fetch', error);
      this.setState({
        error,
        status: 'rejected',
      });
    }

    finally {
      this.setState({
        isLoading: false,
      });
    }
  };
    
handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

openModal = () => {
    this.setState(prevState =>
    ({
      showModal: !prevState.showModal,
      largeImage: '',
    } 
    ));
  };

  //Скролл при клике на кнопку
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // selectImg = largeImageURL => {
  //   this.setState({ selectedImg: largeImageURL });
  // };

  // //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  // handleFormSubmit = (searchImgName) => {
  //   //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
  //   this.setState({ searchImgName });
  // };

    
  render() {
    const { searchImgName, showModal, isLoading, largeImage, images, error } = this.state;
    const showLoadMore = images.length > 0 && images.length >= 15;

    return (
      <Container>
        <Searchbar onSearch={this.onChangeQuery} />
        {showModal && (<Modal onClose={this.openModal} >
          <img
            src={largeImage}
            alt={searchImgName}
            onClick={this.openModal}
          />
        </Modal>)}
          <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
          {/* <ImageGalleryItem searchImgName={this.state.searchImgName} onClick={this.openModal}/> */}
        {/* </ImageGallery> */}
        {showLoadMore && <Button onClick={this.getImages} />}
        {isLoading && <Loading />}
        {error && <p> Sorry, something went wrong. Please try again </p>}
      </Container>
    );
   }
}