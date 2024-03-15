import { useState } from 'react';
import toast from 'react-hot-toast';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { requestByKeyWord, objUrlParams } from './components/services/api';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async keyWord => {
    try {
      setGallery([]);
      setError(false);
      const data = await requestByKeyWord(keyWord);

      if (data.total === 0) {
        message();
        return;
      }

      setGallery(data.results);
      console.log(data);
    } catch (error) {
      setError(true);
    }
    // } finally {
    //   console.log(1);
    // }
  };

  const handleClick = () => {};

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {gallery.length > 0 && <ImageGallery items={gallery} />}
      {objUrlParams.total > objUrlParams.per_page && (
        <LoadMoreBtn handleClick={handleClick} />
      )}
    </>
  );
}

function message() {
  toast(
    'Sorry, there are no images matching your search query. Please try again!',
    {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#ffa500',
        color: '#fff',
      },
    }
  );
}

export default App;
