import { useState } from 'react';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { requestByKeyWord, objUrlParams } from './components/services/api';
import message from './components/services/message';
import scrollController from './components/services/noScroll';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [gallery, setGallery] = useState([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState({});

  const handleSearch = async keyWord => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      setPages(prev => prev + 1);
      const data = await requestByKeyWord(objUrlParams.query, pages + 1);
      setGallery(prev => [...prev, ...data.results]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = () => {
    setPages(1);
  };

  const openModal = () => {
    setModalIsOpen(true);
    scrollController.disabledScroll();
  };

  const afterOpenModal = obj => {
    setModalImg(obj);
    openModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    scrollController.enabledScroll();
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} handleChange={handleChange} />
      {error && <ErrorMessage />}
      {gallery.length > 0 && (
        <ImageGallery items={gallery} onClickImg={afterOpenModal} />
      )}
      {loading && <Loader />}
      {objUrlParams.total > objUrlParams.per_page &&
        pages < objUrlParams.total / objUrlParams.per_page &&
        gallery.length > 0 &&
        !loading && <LoadMoreBtn handleClick={handleClick} />}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        data={modalImg}
      />
    </>
  );
}

export default App;
