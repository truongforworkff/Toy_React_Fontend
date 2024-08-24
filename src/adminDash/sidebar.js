import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,faLayerGroup,faBars,faCartPlus, faRadiationAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';


const Sidebar = () => {
    const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
  }, []);

//   function toggleDrawer() {
//     setOpenedDrawer(!openedDrawer);
//   }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
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
      history.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };


  return (
    <div className="d-flex flex-column vh-100 bg-light border-end">
      <div className="p-3">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">BShop</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/admin" className="nav-link active" aria-current="page">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link text-dark" >
              <FontAwesomeIcon icon={faBars} className="me-2" />
              Products
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/admin/products/add" className="nav-link text-dark" >
              <FontAwesomeIcon icon={faBars} className="me-2" />
            Add Product
            </Link>
          </li> */}
          <li>
            <Link to="/admin/order" className="nav-link text-dark">
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              Order
            </Link>
          </li>
          <li>
            <Link to="/admin/category" className="nav-link text-dark">
              <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
              Category
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link text-dark">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Profile
            </Link>
          </li>

          {!isLoggedIn ? (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-item" onClick={changeNav}>
                        <FontAwesomeIcon icon={faRadiationAlt} className="me-2" />
                          Login
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
                         <FontAwesomeIcon icon={faRadiationAlt} className="me-2" />
                        Logout
                      </button>
                    </li>
                  )}
         
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
