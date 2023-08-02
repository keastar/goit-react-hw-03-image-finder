import React, { Component } from "react";
// import Modal from "./Modal/Modal";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Container from './Container';
import Modal from './Modal/Modal';
// import css from './App.module.css';

export default class App extends Component {
   state = {
     images: {},
     searchImgName: '',
    //  selectedCard: null,
     showModal: false,
  };

  openModal = () => {
    this.setState(({ showModal }) =>
    ({
      showModal:
        !showModal,
    }));
  };

  //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  handleFormSubmit = (searchImgName) => {
    //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
    this.setState({ searchImgName });
  };

  selectCard = link => {
    this.setState({ selectedCard: link });
  };
  
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch('https://pixabay.com/api/?key=38437230-a55c844227541f1a03bd232fe&q=yellow+flowers&image_type=photo')
  //     .then(res => res.json())
  //     .then(images => (this.setState({ images })))
  //     .finally(() => this.setState({ loading: false }))
  // };
  
  render() {
    const { showModal } = this.state;
    return (
      <Container>
        <Searchbar propName={this.handleFormSubmit} />
        {showModal && (<Modal onClose={this.openModal}>
          <img
            src="https://pixabay.com/get/gcf031e133a13456967e60ba576225dcd0d64ae24591b2da890e00abd9f86aea23e0ece4a4edcfc28810cf9cbf47502c0b458dcfac6d7be3b143dad958cdd7dde_1280.jpg"
            alt={this.state.searchImgName}
            onClick={this.openModal}
          />
        </Modal>)}
          <ImageGallery>
          <ImageGalleryItem searchImgName={this.state.searchImgName} onClick={ this.openModal } onSelect={this.selectCard} />
          </ImageGallery>
      </Container>
    );
   }
}