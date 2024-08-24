import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FeatureProduct({ title, price, imageUrl, slug }) {
  const displayPrice = `${price}vnd`;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt={title}
          src={imageUrl}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <p className="card-text text-center text-muted">{displayPrice}</p>
          <div className="d-grid gap-2">
            <Link to={`/products/${slug}`} className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

FeatureProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default FeatureProduct;
