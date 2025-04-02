import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../apiCalls/BooksAPI';

interface NewBookFormProps {
  // Shows whether update was successful or not
  onSuccess: () => void;
  onCancel: () => void;
}

// This is expecting the interface above
const AddBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Sets equal to whatever is in form data + the input box value
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop the refresh
    await addBook(formData); // calls the addBook api call in the api file
    onSuccess(); // Shows that youu got the data
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <div className="form-grid">
        <label>Book Title:</label>
        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Author:</label>
        <input
          required
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <label>Publisher:</label>
        <input
          required
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
        <label>ISBN:</label>
        <input
          required
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
        <label>Classification:</label>
        <input
          required
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
        <label>Category:</label>
        <input
          required
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <label>Page Count:</label>
        <input
          required
          type="number"
          step={1}
          min={1}
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
        <label>Price</label>
        <input
          required
          type="number"
          min={0.01}
          step={0.01}
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Project</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
