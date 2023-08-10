import React, { Component } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Container from './Container';

export default class App extends Component {
   state = {
     images: [],
     currentPage: 1,
     searchImgName: '',
     selectedImg: null,
     error: null,

  };

  //3.handleFormSubmit принимает значение searchImgName из файла Searchbar.js
  handleFormSubmit = (searchImgName) => {
    //4.В текущее значение state=searchImgName записывается изменненое значение с поля формы input из файла Searchbar
    this.setState({
      searchImgName: searchImgName,
      images: [],
      currentPage: 1,
      error: null,
    });
  };
  
  render() {
    const { searchImgName } = this.state;
    return (
      <Container>
        <Searchbar propName={this.handleFormSubmit} />
        <ImageGallery searchImgName={searchImgName} />
      </Container>
    );
   }
}