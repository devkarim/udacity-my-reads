import PropTypes from 'prop-types';
import BookCard from './BookCard';

const BooksList = ({ books, onChangeShelf }) => {
  return (
    <ol className="books-grid">
      {books.map((b) => (
        <BookCard
          key={b.id}
          id={b.id}
          imageUrl={b.imageLinks.thumbnail}
          title={b.title}
          authors={b.authors}
          currentShelf={b.shelf}
          onChangeShelf={onChangeShelf}
        />
      ))}
    </ol>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BooksList;
