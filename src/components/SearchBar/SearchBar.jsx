import toast, { Toaster } from 'react-hot-toast';
import { LuSearch } from 'react-icons/lu';

import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.searchInput.value;
    if (inputValue.trim() === '') {
      toast('Please enter search term!', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ffa500',
          color: '#fff',
        },
      });
      return;
    }
    onSearch(inputValue);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <LuSearch className={css.icon} />
        <input
          className={css.input}
          type="text"
          name="searchInput"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
