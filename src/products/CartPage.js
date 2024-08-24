import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const history = useHistory(); // Hook để điều hướng
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCartItems);

    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Cập nhật localStorage
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Cập nhật localStorage
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      history.push('/login');
      return;
    }

    if (user.role === 'admin') {
      // Nếu là admin, không cho phép đặt hàng
      alert('Admins are not allowed to place orders.');
      return;
    }

    try {
     
      const order = {
        customer: user.userId, // ID người dùng từ localStorage
        products: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.title,
          size: item.selectedSize, // Nếu có size
          color: item.selectedColor
          // Nếu có color
        })),
        totalPrice: calculateTotal(),
        status: 'Pending'
      };
      console.log(calculateTotal())
      console.log(order)

      const response = await axios.post('https://cloulding.onrender.com/api/oders', order);
      setSuccessMessage('Order placed successfully!');
      console.log('Order placed successfully:', response.data);
      localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi đặt hàng thành công
       // Chuyển hướng đến trang thành công

       alert('Order placed successfully');
       window.location.reload();
       
    } catch (error) {
        console.error('Error placing order:', error);
        setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container pt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                  <td>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Total: {formatCurrency(calculateTotal())}</h3>
            <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
