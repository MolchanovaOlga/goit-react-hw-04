import { useEffect, useState } from 'react';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import requestByKeyWord from './components/services/api';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async keyWord => {
    try {
      //setGallery([]);
      setError(false);
      const data = await requestByKeyWord(keyWord);
      setGallery(data.results);
    } catch (error) {
      setError(true);
    }
    // } finally {
    //   console.log(1);
    // }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {gallery.length > 0 && <ImageGallery items={gallery} />}
    </>
  );
}

export default App;
