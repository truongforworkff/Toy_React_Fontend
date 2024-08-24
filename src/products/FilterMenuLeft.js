import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FilterMenuLeft({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);
  const [sizes] = useState(['s', 'm', 'l', 'xl', 'One-Size']);
  const [colors] = useState(['Red', 'Green', 'Blue', 'Yellow', 'Black', 'Orange', 'White']);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [selectedSizes, setSelectedSizes] = useState(filters.sizes);
  const [selectedColors, setSelectedColors] = useState(filters.colors);
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

  // Fetch categories from API
  useEffect(() => {
    axios.get('https://cloulding.onrender.com/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      minPrice,
      maxPrice,
      sizes: selectedSizes,
      colors: selectedColors,
      category: selectedCategory
    }));
  }, [minPrice, maxPrice, selectedSizes, selectedColors, selectedCategory, setFilters]);

  const handleSizeChange = (size) => {
    setSelectedSizes(prevSizes =>
      prevSizes.includes(size)
        ? prevSizes.filter(s => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prevColors =>
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  const handleCategoryChange = (category) => {
    console.log('Category clicked:', category); // Thêm dòng này để kiểm tra giá trị category
    setSelectedCategory(prevCategory => {
      const newCategory = prevCategory === category ? '' : category;
      console.log('Previous Category:', prevCategory);
      console.log('New Category:', newCategory);
      return newCategory;
    });
  };

  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Category</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`btn btn-sm rounded-pill me-2 mb-2 ${selectedCategory === category.slug ? 'btn-dark text-light' : 'btn-outline-dark'}`}
            >
              {category.display}
            </button>
          ))}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Size</h5>
        <div className="d-flex flex-column">
          {sizes.map(size => (
            <label key={size} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <span className="form-check-label">{size}</span>
            </label>
          ))}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Color</h5>
        <div className="d-flex flex-column">
          {colors.map(color => (
            <label key={color} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <span className="form-check-label">{color}</span>
            </label>
          ))}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price Range</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default FilterMenuLeft;
