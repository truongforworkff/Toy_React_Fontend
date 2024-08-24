import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductH({ title, price, percentOff, imageUrl, slug, onAddToCart }) { // Thêm onAddToCart vào đây
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
        <div className="row g-0">
          <div className="col-4">
            <Link to={`/products/${slug}`} replace>
              <div
                className="badge bg-dim py-2 text-white position-absolute"
                style={{ top: '0.5rem', left: '0.5rem' }}
              >
                {percentOff > 0 && `${percentOff}% Off`}
              </div>
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt={title}
                src={imageUrl}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {title}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button 
                    className="btn btn-outline-dark mt-3"
                    onClick={onAddToCart} // Sử dụng onAddToCart mà không cần gọi trực tiếp
                  >
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductH.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  percentOff: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired, // Đảm bảo rằng onAddToCart là bắt buộc
};

ProductH.defaultProps = {
  percentOff: 0,
};

export default ProductH;
