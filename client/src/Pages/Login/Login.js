import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../Actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.userReducer.user);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const isDisabld = !(error.email === null && error.password === null);
  useEffect(() => {
    if (user) {
      if (user.statusCode === 200) {
        setError({
          email: "",
          password: "",
        });
        setLoginDetails({
          email: "",
          password: "",
        });
        toast.success(user?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      }
      else{
        toast.error(user?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch(UserActions.resetLoginUser())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    handleValidation(e);
  };

  const handleValidation = (event) => {
    switch (event.target.name) {
      case "email":
        if (!event.target.value) {
          setError({ ...error, email: "Please enter email" });
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            event.target.value
          )
        ) {
          setError({ ...error, email: "Please enter valid email" });
        } else {
          setError({ ...error, email: null });
        }
        break;
      case "password":
        if (!event.target.value) {
          setError({ ...error, password: "Please enter Password" });
        } else {
          setError({ ...error, password: null });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserActions.loginUser(loginDetails));
  };
  return (
    <div
      className={`container-fluid col-md-12 text-center align-items-center d-flex justify-content-center ${loginStyles.height_full}`}
    >
      <ToastContainer />
      <div className={`col-md-4 p-4 ${loginStyles.innerContainer}`}>
        <form onSubmit={handleSubmit}>
          <h2 className={`my-3`}>Login</h2>
          <div className="my-4">
            <input
              className={`form-control my-1 ${
          error.email ? "is-invalid" : ""
        } ${error.email===null? "is-valid" : ""}`}
              name="email"
              type="text"
              onChange={handleChange}
              value={loginDetails.email}
              onBlur={handleValidation}
              placeholder="Enter Email"
            />
            {error.email && <p className="errorText fw-bold">{error.email}</p>}
          </div>
          <div className="my-4">
            <input
              className={`form-control my-1 ${
          error.password ? "is-invalid" : "" }`}
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleValidation}
              value={loginDetails.password}
              placeholder="Enter Password"
            />
            {error.password && (
              <p className="errorText fw-bold">{error.password}</p>
            )}
          </div>
          <p className={`fw-bold`}>
            Not a Member?{" "}
            <Link to="/register" className={`text-white`}>
              Sign up now
            </Link>
          </p>
          <button className="btn btn-primary" disabled={isDisabld}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
