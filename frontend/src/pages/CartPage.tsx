import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useEffect, useState } from 'react';

function CartPage() {
  const navigate = useNavigate();
  const { cart, numItems, totalPrice, clearCart, removeFromCart } = useCart(); // Gets the context file that was build
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const sumTotal = cart.reduce((tot, c) => tot + c.price * c.quantity, 0);
    setSubtotal(sumTotal);
  }, [cart]);
  return (
    <>
      <div className="container-fluid">
        <WelcomeBand />
        <div>
          <h2>Your cart</h2>
          {/* Map out what is in the cart */}
          <div>
            {cart.length === 0 ? (
              <>
                <hr />
                <p>Your cart is empty</p>
              </>
            ) : (
              <ul>
                {cart.map((item: CartItem) => (
                  <li className="list-unstyled" key={item.bookID}>
                    <hr />
                    <strong style={{ fontSize: '24px' }}>{item.title}</strong>
                    <br />
                    Price per book: ${item.price.toFixed(2)}
                    {/*Function expects book ID */}
                    <br />
                    Quantity: {item.quantity} book(s)
                    <br />
                    Subtotal: ${item.quantity * item.price}
                    <br />
                    <br />
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <hr />
          </div>
          <h3>Total: ${subtotal.toFixed(2)}</h3>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/books')}
          >
            Continue Browsing
          </button>
          <br />
          <br />
          <button className="btn btn-danger" onClick={() => clearCart()}>
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
