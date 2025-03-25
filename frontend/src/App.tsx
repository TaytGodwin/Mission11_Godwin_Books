import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // router enables routing, routes hold defintions, route is a specific route
import BooksPage from './pages/BooksPage';
import BuyBookPage from './pages/BuyBookPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import CartSummary from './components/CartSummary';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <NavBar />
          <CartSummary />
          <Routes>
            {/* Default route */}
            <Route path="/" element={<BooksPage />}></Route>
            <Route path="/books" element={<BooksPage />}></Route>
            <Route
              path="/buy/:title/:bookID/:price"
              element={<BuyBookPage />}
            ></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
