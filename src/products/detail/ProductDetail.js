import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { Link } from "react-router-dom";

function ProductDetail() {
  const { slug } = useParams(); // Lấy slug từ URL
  const [product, setProduct] = useState(null); // State để lưu trữ thông tin sản phẩm
  const [relatedProducts, setRelatedProducts] = useState([]); // State để lưu trữ các sản phẩm liên quan
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
  const [error, setError] = useState(null); // State để lưu trữ lỗi nếu có

  useEffect(() => {
    // Hàm gọi API để lấy chi tiết sản phẩm
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://cloulding.onrender.com/api/products/${slug}`);
        setProduct(response.data); // Cập nhật state với dữ liệu sản phẩm

        // Gọi API để lấy tất cả sản phẩm
        const allProductsResponse = await axios.get('https://cloulding.onrender.com/api/products');
        const allProducts = allProductsResponse.data;

        // Chọn ngẫu nhiên 4 sản phẩm
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);

        setRelatedProducts(selectedProducts); // Cập nhật state với sản phẩm liên quan
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError(err.message); // Cập nhật lỗi nếu có
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProduct(); // Gọi hàm khi component được render
  }, [slug]); // Chỉ gọi lại API khi slug thay đổi

  if (loading) return <p>Loading...</p>; // Hiển thị khi đang loading
  if (error) return <p>Error: {error}</p>; // Hiển thị lỗi nếu có

  return (
    product && (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
          <ol className="breadcrumb p-3">
            <li className="breadcrumb-item">
              <Link className="text-decoration-none link-secondary" to="/products">
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a className="text-decoration-none link-secondary" href="!#">
                {product.categorySlug?.display}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>
        <div className="row mb-4">
          <div className="d-none d-lg-block col-lg-1">
            <div className="image-vertical-scroller">
              <div className="d-flex flex-column">
                {Array.from({ length: 10 }, (_, i) => {
                  let selected = i !== 1 ? "opacity-6" : "";
                  return (
                    <a key={i} href="!#">
                      <img
                        className={"rounded mb-2 ratio " + selected}
                        alt=""
                        src={product.image01 || Image}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                  className="border rounded ratio ratio-1x1"
                  alt=""
                  src={product.image01 || Image}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{product.title}</h2>
              <h4 className="text-muted mb-4">{Number(product.price).toLocaleString("vi-VN")} vnd</h4>

              <div className="row g-3 mb-4">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100">
                    Add to cart
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-dark py-2 w-100">Buy now</button>
                </div>
              </div>

              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Code</dt>
                <dd className="col-sm-8 mb-3">{product.slug}</dd>

                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 mb-3">{product.categorySlug?.display}</dd>

                <dt className="col-sm-4">Color</dt>
                <dd className="col-sm-8 mb-3">{product.colors.join(", ")}</dd>

                <dt className="col-sm-4">Sizes</dt>
                <dd className="col-sm-8 mb-3">{product.size.join(", ")}</dd>

                <dt className="col-sm-4">Rating</dt>
                {/* Bạn có thể thêm phần hiển thị rating ở đây nếu cần */}
              </dl>

              <h4 className="mb-0">Description</h4>
              <hr />
              <p className="lead flex-shrink-0">
                <small>{product.description}</small>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-4">
            <hr />
            <h4 className="text-muted my-4">Related products</h4>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
              {relatedProducts.map(product => (
                <RelatedProduct
                  key={product.id}
                  product={product}
                  price={Number(product.price).toLocaleString("vi-VN")}
                  percentOff={Math.random() > 0.5 ? 15 : null} // Chọn ngẫu nhiên phần trăm giảm giá
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetail;
