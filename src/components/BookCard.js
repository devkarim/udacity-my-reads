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
          {console.log((currentShelf !== 'none' && currentShelf) || '')}
          <div className="book-shelf-changer">
            <select
              value={(currentShelf !== 'none' && currentShelf) || 'none'}
              onChange={(e) => onChangeShelf(id, currentShelf, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {currentShelf && currentShelf !== 'none' && (
                <option value="none">None</option>
              )}
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
