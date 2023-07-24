import React from "react";
import Modal from "./Modal/Modal";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';
import Container from './Container';



// class App extends Component { 

// }
export const App = () => {
  return (
    <Container>
      <Searchbar />
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true} />
      <ImageGallery />
      Привет, ВСЕЕЕЕЕЕЕМ!!!!!!!!!!!!
      <ImageGalleryItem />
      <Modal />
    </Container>
  );
};
