import { Link } from "react-router-dom";

function RelatedProduct({ product }) {
  const { title, price, image01, slug, percentOff } = product;
  let offPrice = `${Number(price).toLocaleString("vi-VN")} vnd`;

  if (percentOff && percentOff > 0) {
    offPrice = (
      <>
        <del>{price}Ks</del> {price - (percentOff * price) / 100}vnd
      </>
    );
  }


  return (
    <Link
      to={`/products/${slug}`} // Thay đổi đường dẫn đến trang sản phẩm chi tiết
      className="col text-decoration-none"
    >
      <div className="card shadow-sm">
        {percentOff && (
          <div
            className="badge bg-dim py-2 text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {percentOff}% OFF
          </div>
        )}
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt={title}
          src={image01}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {title}
          </h5>
          <p className="card-text text-center text-muted">{offPrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;
