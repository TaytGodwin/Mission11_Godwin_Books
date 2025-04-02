import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../apiCalls/BooksAPI';

// This shows whether the update was successful or not
interface EditBookFormProps {
  book: Book; // Recieve a project to edit
  onSuccess: () => void;
  onCancel: () => void;
}

// This is expecting the interface above
const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book }); // Default is the project with its different attributes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Sets equal to whatever is in form data + the input box value
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop refresh
    await updateBook(formData.bookID, formData); // Calls the updateBook api call from the api file
    onSuccess(); // Tells that ou got the data
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <div className="form-grid">
        <label>
          Title:
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            required
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Publisher:
          <input
            required
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <label>
          ISBN:
          <input
            required
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </label>
        <label>
          CLassification:
          <input
            required
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            required
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Page Count:
          <input
            required
            type="number"
            name="pageCount"
            min={1}
            value={formData.pageCount}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            required
            type="number"
            name="price"
            min={0.01}
            step={0.01}
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Book</button>
        <button type="button" onClick={onCancel}>
          Cancel{' '}
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
