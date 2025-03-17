import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [Books, setBooks] = useState<Book[]>([]); // Holds an array of books
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0); // Keeps track of total number of books
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have

  // Get list of books, but only when necessary
  useEffect(() => {
    const fetchBooks = async () => {
      // Function to get books
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      // Set variable
      setBooks(data.books); // Get projects from json
      setTotalBooks(data.totalNumBooks); // Set total books
      setTotalPages(Math.ceil(totalBooks / pageSize)); // Divide the number of books by the page size to get the total page size
    };
    // Call the function
    fetchBooks();
  }, [pageSize, pageNum, totalBooks]);
  return (
    <>
      <h1>Book List</h1>
      <br />
      {Books.map((b) => (
        <div id="projectCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <br />
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value)); // Sends what is selected
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        {/*Subtract 1 from current page number to disable it*/}
        Previous
      </button>
      {[...Array(totalPages)].map(
        // Array of the total number of pages
        (
          _,
          index // Index starts at 0 and counts on
        ) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {/* Sets what page you are on */}
            {index + 1}
            {/* Shows page number */}
          </button>
        )
      )}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      {/*Add 1 to current page number*/}
    </>
  );
}

export default BookList;
