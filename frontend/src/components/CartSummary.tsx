import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { numItems, totalPrice } = useCart();
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          background: '#f8f9fa',
          padding: '5px 10px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          fontSize: '16px',
        }}
        onClick={() => navigate('/cart')}
      >
        🛒
        <strong>
          ${totalPrice}
          <br />
          {numItems} Books
        </strong>
      </div>
    </>
  );
};

export default CartSummary;
