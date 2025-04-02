import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* This button appears on smaller screens to toggle navigation */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* This contains the actual links in the navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/books')}>
                Book List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/cart')}>
                My Cart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/admin')}>
                Admin Page
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
