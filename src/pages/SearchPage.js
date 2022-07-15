import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksList from '../components/BooksList';
import * as BooksAPI from '../BooksAPI';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [emptyResults, setEmptyResults] = useState(false);
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  const changeShelf = (bookId, oldShelf, newShelf) => {
    BooksAPI.update(bookId, newShelf);

    const updatedBook = books.find((b) => b.id === bookId);
    updatedBook.shelf = newShelf;

    const updatedMyBook = myBooks.find((b) => b.id === bookId);
    if (updatedMyBook) {
      updatedMyBook.shelf = newShelf;
      setMyBooks([...myBooks]);
    }

    setBooks([...books]);
  };

  const search = async (q) => {
    setEmptyResults(false);
    setQuery(q);
    if (!q) return setBooks([]);
    try {
      const searchedBooks = await BooksAPI.search(q, 10);
      if (searchedBooks.error) {
        setEmptyResults(true);
        setBooks([]);
        return;
      }

      const fullDataBooks = [];
      const booksWithThumbnails = searchedBooks.filter((b) => b.imageLinks);

      for (const book of booksWithThumbnails) {
        const myBook = myBooks.find((b) => book.id === b.id);
        if (myBook) {
          fullDataBooks.push(myBook);
        } else {
          fullDataBooks.push(book);
        }
      }

      console.log('Searched', fullDataBooks);
      setBooks(fullDataBooks || []);
    } catch (err) {
      setBooks([]);
    }
  };

  useEffect(() => {
    const fetchMyBooks = async () => {
      const myBooks = await BooksAPI.getAll();
      setMyBooks(myBooks);
    };

    fetchMyBooks();
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {books.length !== 0 && !emptyResults && query ? (
          <ol className="books-grid">
            <BooksList books={books} onChangeShelf={changeShelf} />
          </ol>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {emptyResults ? 'No results found.' : 'Search for a book...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
