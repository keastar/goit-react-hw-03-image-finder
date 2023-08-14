import axios from 'axios';
import { KEY_API, BASE_URL } from './API_KEY';

const fetchImages = async (searchImgName, currentPage) => {
  const { data } = await axios.get(
    `${BASE_URL}/?key=${KEY_API}&q=${searchImgName}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default fetchImages;
