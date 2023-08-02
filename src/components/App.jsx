import React, { Component } from "react";
// import Modal from "./Modal/Modal";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Container from './Container';
// import css from './App.module.css';

export default class App extends Component {
   state = {
     images: {},
     searchImgName: '',
  };

  //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  handleFormSubmit = (searchImgName) => {
  //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
    this.setState({ searchImgName });
  }
  
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch('https://pixabay.com/api/?key=38437230-a55c844227541f1a03bd232fe&q=yellow+flowers&image_type=photo')
  //     .then(res => res.json())
  //     .then(images => (this.setState({ images })))
  //     .finally(() => this.setState({ loading: false }))
  // }
  
  render() {
    return (
      <Container>
        <Searchbar propName={this.handleFormSubmit} />
          <ImageGallery>
            <ImageGalleryItem searchImgName={this.state.searchImgName} />
          </ImageGallery>
      </Container>
    );
   }
}