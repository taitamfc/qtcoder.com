import React, { useState } from "react";
import Blank from "../../layouts/Blank";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthModel from "../../models/AuthModel";
import Swal from "sweetalert2";

function Login(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email !"),
    password: Yup.string().required("Vui lòng nhập mật khẩu !"),
  });

  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    validationSchema
      .validate(account, { abortEarly: false })
      .then(() => {
        // Validation passed, proceed with login
        AuthModel.login(account)
          .then((res) => {
            const { access_token } = res.data;
            setAccount(res.data);
            // Lưu JWT vào bộ nhớ trình duyệt
            localStorage.setItem("jwtToken", access_token);
            const { user } = res.data;

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/Devices");
            handleLoginSuccess();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Có lổi xảy ra",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          });
      })
      .catch((validationErrors) => {
        // Validation failed, set error messages
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  const handleLoginSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Đăng nhập thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleOnChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  return (
    <Blank>
      <form className="auth-form" onSubmit={handleLogin}>
        {/* .form-group */}
        <div className="form-group">
          <div className="form-label-group">
            <input
              type="text"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              autoFocus=""
              name="email"
              value={account.email}
              onChange={handleOnChange}
            />{" "}
            <label htmlFor="inputEmail">Email</label>
            {errors.email ? (
              <div className="invalid-feedback">{errors.email}</div>
            ) : null}
          </div>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group">
          <div className="form-label-group">
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Mật khẩu"
              name="password"
              value={account.password}
              onChange={handleOnChange}
            />{" "}
            <label htmlFor="inputPassword">Mật khẩu</label>
            {errors.password ? (
              <div className="invalid-feedback">{errors.password}</div>
            ) : null}
          </div>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Đăng Nhập
          </button>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group text-center">
        </div>
        {/* /.form-group */}
        {/* recovery links */}
        <div className="text-center pt-3">
          <Link to={"/forgot"} className="link">
            Quên mật khẩu?
          </Link>
        </div>
        {/* /recovery links */}
      </form>
    </Blank>
  );
}
export default Login;
