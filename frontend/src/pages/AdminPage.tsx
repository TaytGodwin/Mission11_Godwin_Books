import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { fetchBooksCall } from '../apiCalls/BooksAPI';
import { deleteBook } from '../apiCalls/BooksAPI';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';
import Pagination from '../components/Pagination';

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10); // This uses state to remmeber how many items to display on a page
  const [pageNum, setPageNum] = useState<number>(1); // Default to page one
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditBook] = useState<Book | null>(null);
  const [sortByPreference, setSortByPreference] = useState('Title'); // To help the system know what to order the books by

  useEffect(() => {
    // async allows the rest of the page to load
    const loadBooks = async () => {
      try {
        const data = await fetchBooksCall(
          // get all books
          pageSize,
          pageNum,
          sortByPreference,
          []
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    // Call this function
    loadBooks();
  }, [pageSize, sortByPreference, pageNum]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return; // Exit if they don't confirm deleting

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookID !== bookId)); //change display projects to not have this project
    } catch (error) {
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin - Projects</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && ( // If we should show the
        // import the component and pass in the functions required
        <AddBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooksCall(pageSize, pageNum, sortByPreference, []).then(
              (data) => setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingBook && (
        <>
          <EditBookForm
            book={editingBook}
            onSuccess={() => {
              setEditBook(null);
              fetchBooksCall(pageSize, pageNum, sortByPreference, []).then(
                (data) => setBooks(data.books)
              );
            }}
            onCancel={() => setEditBook(null)}
          />
        </>
      )}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        sortByPreference={sortByPreference}
        setSortByPreference={setSortByPreference}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminPage;
