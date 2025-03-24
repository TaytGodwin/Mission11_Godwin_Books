import { useEffect, useState } from 'react';
import { Book } from '../types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [Books, setBooks] = useState<Book[]>([]); // Holds an array of books
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0); // Keeps track of total number of books
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const [sortByPreference, setSortByPreference] = useState('Title'); // To help the system know what to order the books by

  // Get list of books, but only when necessary
  useEffect(() => {
    const fetchBooks = async () => {
      // This is used to filter the books based on category
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`) // encodedURIComponent is used for security
        .join('&'); // for each category, it formats it and joins it with & in the middle
      // Function to get books
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortByPreference}${selectedCategories.length ? `& ${categoryParams}` : ''}` // This sends how many boxes are selected among other parameters
      );
      const data = await response.json();
      // Set variable
      setBooks(data.books); // Get projects from json
      setTotalBooks(data.totalNumBooks); // Set total books
      setTotalPages(Math.ceil(totalBooks / pageSize)); // Divide the number of books by the page size to get the total page size
    };
    // Call the function
    fetchBooks();
  }, [pageSize, pageNum, totalBooks, sortByPreference, selectedCategories]); // app will watch to see if these change
  return (
    <>
      {Books.map((b) => (
        <div id="projectCard" className="card shadow-lg mb-4" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="list-group-item">
                <strong>Author:</strong> {b.author}
              </li>
              <li className="list-group-item">
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li className="list-group-item">
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li className="list-group-item">
                <strong>Classification:</strong> {b.classification}
              </li>
              <li className="list-group-item">
                <strong>Category:</strong> {b.category}
              </li>
              <li className="list-group-item">
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li className="list-group-item">
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <br />
      <br />

      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            {/*Disables button if page 1 is selected*/}
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map(
            (
              _,
              index // Maps out array to make the number of pages calculated above
            ) => (
              <li
                key={index + 1}
                className={`page-item ${pageNum === index + 1 ? 'active' : ''}`} // Puts on specific styling based on the selected page
              >
                <button
                  className="page-link"
                  onClick={() => setPageNum(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
          >
            {/*Disables button if last page is selected*/}
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Filters */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <div className="form-group">
          <label className="me-2 fw-bold">Results per page:</label>
          <select
            className="form-select d-inline w-auto"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value)); // Sets page size based on selection user chooses
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="form-group">
          <label className="me-2 fw-bold">Sort By:</label>
          <select
            className="form-select d-inline w-auto"
            value={sortByPreference}
            onChange={(e) => setSortByPreference(e.target.value)} // Set the preference based on selection
          >
            <option value="Title">Title</option>
            <option value="Author">Author</option>
            <option value="Category">Category</option>
            <option value="Price">Price</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default BookList;
