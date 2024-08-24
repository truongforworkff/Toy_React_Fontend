import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory(); // Sử dụng useHistory

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
  }, []);

  // function toggleDrawer() {
  //   setOpenedDrawer(!openedDrawer);
  // }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }
  const handleCart = async() =>{
    console.log("succes clicks ")
    history.push('/cart');
  }
  const handleLogout = async () => {
    try {
      // Call API logout if needed
      await axios.post('https://cloulding.onrender.com/api/users/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Update state to reflect logged-out status
      setIsLoggedIn(false);

      // Redirect to login page
      history.push('/login'); // Sử dụng history.push
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myOrder" className="nav-link" replace onClick={changeNav}>
                  My Orders
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleCart} // Thay đổi để dẫn đến trang giỏ hàng
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle btn btn-link"
                  id="userDropdown"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {!isLoggedIn ? (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-item" onClick={changeNav}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="dropdown-item" onClick={changeNav}>
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleCart} // Thay đổi để dẫn đến trang giỏ hàng
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            {/* <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
