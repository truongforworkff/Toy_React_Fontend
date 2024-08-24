import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ModalOrder({ showModal, onClose, onConfirm, product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!showModal || !product) return null;

  const handleAddToCart = () => {
    if (selectedSize && selectedColor && quantity > 0) {
      onConfirm({
        ...product,
        selectedSize,
        selectedColor,
        quantity
      });
      onClose();
    } else {
      alert('Please select size, color, and quantity.');
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Order</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div>
            <img src={product.image01} alt={product.title} className="img-fluid mb-3" style={{ width: '25%' }} />
              <h5>{product.title}</h5>
              
              <div className="mb-3">
                <label htmlFor="sizeSelect" className="form-label">Size:</label>
                <select 
                  id="sizeSelect" 
                  className="form-select" 
                  value={selectedSize} 
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select Size</option>
                  {product.size.map(size => (
                    <option key={size} value={size}>{size.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="colorSelect" className="form-label">Color:</label>
                <select 
                  id="colorSelect" 
                  className="form-select" 
                  value={selectedColor} 
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">Select Color</option>
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="quantityInput" className="form-label">Quantity:</label>
                <input 
                  type="number" 
                  id="quantityInput" 
                  className="form-control" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalOrder.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  product: PropTypes.object
};

export default ModalOrder;
