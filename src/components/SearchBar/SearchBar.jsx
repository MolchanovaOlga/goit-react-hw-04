import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.searchInput.value;
    if (inputValue.trim() === '') {
      toast('Please enter search term!', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }
    onSearch(inputValue);
    form.reset();
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchInput"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
