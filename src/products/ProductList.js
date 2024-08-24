import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from './Product';
import ProductH from './ProductH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTopOnMount from '../template/ScrollToTopOnMount';
import FilterMenuLeft from './FilterMenuLeft';
import ModalOrder from './ModalOrder'; 

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '100',
    maxPrice: '1000000',
    sizes: [],
    colors: [],
    category: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios.get('https://cloulding.onrender.com/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (products.length) {
      const filtered = products.filter(product => {
        const price = Number(product.price);
        const sizeMatch = !filters.sizes.length || filters.sizes.some(size => product.size.includes(size));
        const colorMatch = !filters.colors.length || filters.colors.some(color => product.colors.includes(color));
        const priceMatch = price >= Number(filters.minPrice) && price <= Number(filters.maxPrice);
        const categoryMatch = !filters.category || product.categoryId._id === filters.category;
        const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        return sizeMatch &&  colorMatch &&  priceMatch &&  categoryMatch &&  searchMatch;
      });
      setFilteredProducts(filtered);
    }
  }, [products, filters, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const changeViewType = () => {
    setViewType({
      grid: !viewType.grid,
    });
  };

  // const handleAddToCart = (slug) => {
  //   // Bạn có thể thêm logic để xử lý thêm sản phẩm vào giỏ hàng tại đây
  //   console.log(`Product ${slug} added to cart`);
  //   // Ví dụ:
  //   // dispatch(addToCart(slug));
  // };
  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleConfirmOrder = (order) => {
    console.log('Order confirmed:', order);
    // Xử lý lưu trữ vào giỏ hàng hoặc làm gì đó với đơn hàng
     // Lấy giỏ hàng từ localStorage (nếu có), hoặc tạo mảng rỗng
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
  const existingItemIndex = cart.findIndex(item => item.id === order.id);
  
  if (existingItemIndex >= 0) {
    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    cart[existingItemIndex].quantity += order.quantity;
  } else {
    // Nếu sản phẩm chưa có trong giỏ, thêm mới
    cart.push(order);
  }
  
  // Lưu giỏ hàng trở lại localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Toys
          </li>
        </ol>
      </nav>

      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          <Link
            to="/products"
            className="btn btn-sm btn-outline-dark rounded-pill"
            replace
          >
            All Products
          </Link>
        </nav>
      </div>

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search products..."
                    aria-label="search input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {filteredProducts.map(product => (
                viewType.grid ? (
                  <Product
                    key={product.slug}
                    title={product.title}
                    price={Number(product.price).toLocaleString("vi-VN")}
                    percentOff={product.percentOff || 0}
                    imageUrl={product.image01}
                    slug={product.slug}
                   
                    onAddToCart={() => handleAddToCartClick(product)}
                    // Truyền hàm vào đây
                  />
                ) : (
                  <ProductH
                    key={product.slug}
                    title={product.title}
                    price={Number(product.price).toLocaleString("vi-VN")}
                    percentOff={product.percentOff || 0}
                    imageUrl={product.image01}
                    slug={product.slug}
                    onAddToCart={() => handleAddToCartClick(product)}
                  />
                )
              ))}
               <ModalOrder 
        showModal={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmOrder} 
        product={selectedProduct} 
      />
            </div>
            {/* Remove pagination if you want to display all products */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
