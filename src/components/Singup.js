import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://cloulding.onrender.com/api/users/register", formData);
      console.log(response.data); // Xử lý phản hồi từ server (ví dụ, chuyển hướng đến trang đăng nhập)
      setError(""); // Xóa lỗi nếu có
      history.push("/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (err) {
      setError("Đăng ký không thành công. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="bg-gradient-primary" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-signup-image">
                    <img
                      src="https://images.unsplash.com/photo-1654127402392-d6b1e3e6d6ea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
                      alt="Signup Background"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4" style={{ marginBottom: "1.5rem" }}>
                          Create an Account!
                        </h1>
                      </div>
                      <form className="user" onSubmit={handleSignup}>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Sign Up
                        </button>
                        <hr />
                        <button className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Register with Google
                        </button>
                        <button className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a href="/forgot-password" className="small">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a href="/login" className="small">
                          Already have an account? Login!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
