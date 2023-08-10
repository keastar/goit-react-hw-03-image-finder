import React, { Component } from "react";
// import Modal from "./Modal/Modal";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Container from './Container';
import Modal from './Modal/Modal';
// import fetchImages from './api/api';

export default class App extends Component {
   state = {
     images: [],
     currentPage: 1,
     searchImgName: '',
     showModal: false,
     selectedImg: null,
  };

  openModal = () => {
    this.setState(({ showModal }) =>
    ({
      showModal:
        !showModal
    } 
    ));
  };

  
  selectImg = largeImageURL => {
    this.setState({ selectedImg: largeImageURL });
  };

  //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  handleFormSubmit = (searchImgName) => {
    //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
    this.setState({ searchImgName });
  };
  
  render() {
    const { searchImgName, showModal, images, selectedImg } = this.state;
    return (
      <Container>
        <Searchbar propName={this.handleFormSubmit} />
        {showModal && (<Modal onClose={this.openModal} >
          <img
            src={selectedImg} 
            alt={searchImgName}
            onClick={this.openModal}
          />
        </Modal>)}
          <ImageGallery images={images} onSelect={this.Select}>
          <ImageGalleryItem searchImgName={this.state.searchImgName} onClick={this.openModal}/>
          </ImageGallery>
      </Container>
    );
   }
}