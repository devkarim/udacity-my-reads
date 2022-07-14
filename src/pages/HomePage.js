import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';
import * as BooksAPI from '../BooksAPI';

const HomePage = () => {
  const [allBooks, setAllBooks] = useState([]);

  const changeShelf = (bookId, oldShelf, newShelf) => {
    BooksAPI.update(bookId, newShelf);

    const updatedBook = allBooks.find((b) => b.id === bookId);
    updatedBook.shelf = newShelf;

    setAllBooks([...allBooks]);
  };

  useEffect(() => {
    const fetchAll = async () => {
      const allBooks = await BooksAPI.getAll();

      console.log('All books', allBooks);

      setAllBooks(allBooks);
    };

    fetchAll();
  }, []);

  const currentlyReadingBooks = allBooks.filter(
    (b) => b.shelf === 'currentlyReading'
  );

  const wantToReadBooks = allBooks.filter((b) => b.shelf === 'wantToRead');
  const readBooks = allBooks.filter((b) => b.shelf === 'read');

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            books={currentlyReadingBooks}
            onChangeShelf={changeShelf}
          />
          <BookShelf
            title="Want To Read"
            books={wantToReadBooks}
            onChangeShelf={changeShelf}
          />
          <BookShelf
            title="Read"
            books={readBooks}
            onChangeShelf={changeShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
