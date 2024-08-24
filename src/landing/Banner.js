
const bannerOne ="https://file.hstatic.net/200000265619/file/banner_nganh_hang_-_des_f1a813c6758b4c5ab1a00af0dcabe269.jpg";
const bannerTwo = "https://img.freepik.com/premium-photo/set-cute-vintage-robots-with-banner-robot-toys_76964-49581.jpg"
const bannerZero = "https://png.pngtree.com/thumb_back/fw800/background/20240716/pngtree-clipart-of-basket-full-with-toy-cars-image_16010602.jpg"


function BannerIncidator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props) {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5>Banner Header</h5>
        <p>Some representative placeholder content for the banner.</p>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        <BannerIncidator index="0" active={true} />
        <BannerIncidator index="1" />
        <BannerIncidator index="2" />
      </div>
      <div className="carousel-inner">
        <BannerImage image={bannerOne} active={true} />
        <BannerImage image={bannerZero} />
        <BannerImage image={bannerTwo} />
      </div>
    </div>
  );
}

export default Banner;
