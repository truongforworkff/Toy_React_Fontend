import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Product({ title, price, percentOff, imageUrl, slug, onAddToCart }) {
  let offPrice = `${price}vnd`;

  if (percentOff && percentOff > 0) {
    offPrice = (
      <>
        <del>{price}vnd</del> {price - (percentOff * price) / 100}vnd
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${slug}`} replace>
          <div
            className="badge bg-dim py-2 text-white position-absolute"
            style={{ top: '0.5rem', right: '0.5rem' }}
          >
            {percentOff > 0 && `${percentOff}% Off`}
          </div>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt={title}
            src={imageUrl}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {title}
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button 
              className="btn btn-outline-dark mt-3"
              onClick={() => onAddToCart()} // Gọi hàm onAddToCart khi người dùng click
            >
              <FontAwesomeIcon icon={['fas', 'cart-plus']} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  percentOff: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired, // Bắt buộc phải có hàm onAddToCart
};

Product.defaultProps = {
  percentOff: 0,
};

export default Product;
