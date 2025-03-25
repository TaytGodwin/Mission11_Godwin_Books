import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function BuyBookPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams(); // Allows you to get the parameter sent in the route
  const { addToCart } = useCart(); // This is the hook built in the context file
  const [quantity, setBookQuantity] = useState<number>(1); // Keeps track of how many books they will buy
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No book found',
      price: Number(price),
      quantity: quantity,
    };
    // send item to the cart
    addToCart(newItem);
    // Go to cart
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div>
        <input
          type="number"
          placeholder="Enter quantity of book to buy"
          step="1"
          value={quantity}
          onChange={
            (x) => setBookQuantity(Number(x.target.value)) // Multiply amount chosen by price per book
          }
        />
      </div>
      {/* The following button will go back to the last page */}
      <button className="btn btn-success" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className="btn btn-success" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </>
  );
}

export default BuyBookPage;
