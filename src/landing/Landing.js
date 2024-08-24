import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './Banner';
import FeatureProduct from './FeatureProduct';
import ScrollToTopOnMount from '../template/ScrollToTopOnMount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axios.get('https://cloulding.onrender.com/api/products')
      .then(response => {
        const allProducts = response.data;
        // Randomly select 6 products
        const selectedProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
        setProducts(selectedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
        Discover a world of imagination and fun with our carefully curated selection of toys, designed to inspire creativity and bring endless joy to children of all ages.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {products.map(product => (
            <FeatureProduct
              key={product.slug}
              title={product.title}
              price={Number(product.price).toLocaleString("vi-VN")}
              imageUrl={product.image01}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
