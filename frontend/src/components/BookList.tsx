import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import './CategoryFilter.css';
import { useNavigate } from 'react-router-dom';
import { fetchBooksCall } from '../apiCalls/BooksAPI.ts';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [Books, setBooks] = useState<Book[]>([]); // Holds an array of books
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const [sortByPreference, setSortByPreference] = useState('Title'); // To help the system know what to order the books by
  const navigate = useNavigate(); // Uses navigate
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get list of books, but only when necessary
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksCall(
          pageSize,
          pageNum,
          sortByPreference,
          selectedCategories
        );
        // Set variable
        setBooks(data.books); // Get books from json
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Divide the number of books by the page size to get the total page size
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false); // Run whether or not there is an error
      }
    };
    // Call the function
    loadBooks();
  }, [pageSize, pageNum, sortByPreference, selectedCategories]); // app will watch to see if these change

  // What it returns while loading
  if (loading) return <p>Loading Books...</p>;
  // What it returns if there is an error
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {' '}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        sortByPreference={sortByPreference}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
        setSortByPreference={setSortByPreference}
      />
      <br />
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
            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)}
            >
              Purchase Book
            </button>
          </div>
        </div>
      ))}
      <br />
      <br />
    </>
  );
}

export default BookList;
