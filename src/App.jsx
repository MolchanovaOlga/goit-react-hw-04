import { useState } from 'react';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { requestByKeyWord, objUrlParams } from './components/services/api';
import message from './components/services/message';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [gallery, setGallery] = useState([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(false);

  const handleSearch = async keyWord => {
    try {
      setGallery([]);
      setError(false);
      const data = await requestByKeyWord(keyWord, pages);

      if (data.total === 0) {
        message();
        return;
      }

      setGallery(data.results);
    } catch (error) {
      setError(true);
    }
    // } finally {
    //   console.log(1);
    // }
  };

  const handleClick = async () => {
    setPages(prev => prev + 1);
    const data = await requestByKeyWord(objUrlParams.query, pages + 1);
    setGallery(prev => [...prev, ...data.results]);
  };

  const handleChange = () => {
    setPages(1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} handleChange={handleChange} />
      {error && <ErrorMessage />}
      {gallery.length > 0 && <ImageGallery items={gallery} />}
      {objUrlParams.total > objUrlParams.per_page &&
        pages < objUrlParams.total / objUrlParams.per_page &&
        gallery.length > 0 && <LoadMoreBtn handleClick={handleClick} />}
    </>
  );
}

export default App;
