import PropTypes from 'prop-types';

const BookCard = ({
  id,
  title,
  imageUrl,
  authors,
  currentShelf,
  onChangeShelf,
}) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageUrl}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={(currentShelf !== 'none' && currentShelf) || 'none'}
              onChange={(e) => onChangeShelf(id, currentShelf, e.target.value)}
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors ? authors.join(' - ') : 'N/A'}
        </div>
      </div>
    </li>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  authors: PropTypes.array,
  currentShelf: PropTypes.string,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookCard;
