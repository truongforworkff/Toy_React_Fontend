import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Nhập khẩu đúng cách

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://cloulding.onrender.com/api/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token); // Save the token
      
      // Giải mã token để lấy thông tin user
      const decodedToken = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(decodedToken)); // Save the decoded user data

      console.log(response.data); // Lưu thông tin đăng nhập hoặc chuyển hướng trang
      setError(""); // Xóa lỗi nếu có

      // Điều hướng dựa trên vai trò của user
      if (decodedToken.role === 'admin') {
        history.push("/admin"); // Chuyển hướng đến trang quản lý admin
      } else {
        history.push("/"); // Chuyển hướng về trang chủ cho người dùng bình thường
      }
    } catch (err) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin!");
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
                  <div className="col-lg-6 d-none d-lg-block bg-login-image">
                    <img
                      src="https://images.unsplash.com/photo-1654127402392-d6b1e3e6d6ea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D" /* Đường dẫn đến hình ảnh của bạn */
                      alt="Login Background"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4" style={{ marginBottom: "1.5rem" }}>
                          Welcome Back!
                        </h1>
                      </div>
                      <form className="user" onSubmit={handleLogin}>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: "1rem" }}>
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                        <hr />
                        <button className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Login with Google
                        </button>
                        <button className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a href="/forgot-password" className="small">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a href="/register" className="small">
                          Create an Account!
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

export default Login;
