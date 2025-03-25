export interface CartItem {
  // Each individual book in the cart
  bookID: number;
  title: string;
  price: number; // Price of one book
  quantity: number; // Total number of books
}
