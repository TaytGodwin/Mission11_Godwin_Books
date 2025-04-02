import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://mission13backend.azurewebsites.net/api/Book';

// This gets all books
export const fetchBooksCall = async (
  pageSize: number,
  pageNum: number,
  sortByPreference: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    // This is used to filter the books based on category
    const categories = selectedCategories
      .map((cat) => `categoryTypes=${encodeURIComponent(cat)}`) // encodedURIComponent is used for security
      .join('&'); // for each category, it formats it and joins it with & in the middle
    // Function to get books
    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortByPreference}${selectedCategories.length ? `&${categories}` : ''}`, // This sends how many boxes are selected among other parameters
      { credentials: 'include' }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('An error occured when fetching books', error);
    throw error;
  }
};

// This adds books
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

// This edits an existing book
export const updateBook = async (
  bookId: number,
  updateBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        // passing information as part of a json object
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateBook),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

// This deletes a book and doesn't return anything
export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delte project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
