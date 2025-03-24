import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // Gets the context file that was build
  return (
    <>
      <WelcomeBand />
      <div>
        <h2>Your cart</h2>
        {/* Map out what is in the cart */}
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookID}>
                  {item.title} : ${item.price.toFixed(2)}
                  {/*Function expects book ID */}
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: </h3>
        <button onClick={() => navigate('/books')}>Continue Browsing</button>
      </div>
    </>
  );
}

export default CartPage;
