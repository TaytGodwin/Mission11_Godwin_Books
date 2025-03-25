import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart, removeFromCart } = useCart(); // Gets the context file that was build

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
                    <hr className="border-primary" />
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

            <hr className="border-primary" />
          </div>
          <h3>Total: ${totalPrice}</h3>
          <button className="btn btn-success" onClick={() => navigate(-1)}>
            Previous Page
          </button>
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
