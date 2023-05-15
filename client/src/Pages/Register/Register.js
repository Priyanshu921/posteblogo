import React, { useEffect, useState } from "react";
import RegisterStyles from "./Register.module.css";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserActions } from "../../Actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
export const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const userRegistered = useSelector((state) => state.userReducer.userRegistered);
  const [registerDetails, setRegisterDetails] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:""
  });
  const [error, setError] = useState({
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
    registerFullName: "",
  });

  useEffect(()=>{
    if(userRegistered){
      if(userRegistered?.statusCode===201){
        setError({
          registerEmail: "",
          registerPassword: "",
          registerConfirmPassword: "",
          registerFullName: "",
        });
        setRegisterDetails({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
         toast.success(userRegistered?.message, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
         });
      }
      else{
        toast.error(userRegistered?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      dispatch(UserActions.resetRegisteredUser())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userRegistered])

  const handleValidation = (event) => {
    switch (event.target.name) {
      case "email":
        if (!event.target.value) {
          setError({ ...error, registerEmail: "Please enter email" });
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            event.target.value
          )
        ) {
          setError({ ...error, registerEmail: "Please enter valid email" });
        } else {
          setError({ ...error, registerEmail: null });
        }
        break;
      case "password":
        if (!event.target.value) {
          setError({ ...error, registerPassword: "Please enter password" });
        } else if (!(event.target.value === registerDetails.confirmPassword)) {
          setError({
            ...error,
            registerPassword: "Passwords don't match",
            registerConfirmPassword: "Passwords don't match",
          });
        } else {
          setError({
            ...error,
            registerPassword: null,
            registerConfirmPassword: null,
          });
        }
        break;
      case "confirmPassword":
        if (!event.target.value) {
          setError({
            ...error,
            registerConfirmPassword: "Please re enter password",
          });
        } else if (!(event.target.value === registerDetails.password)) {
          setError({
            ...error,
            registerConfirmPassword: "Passwords don't match",
            registerPassword: "Passwords don't match",
          });
        } else {
          setError({
            ...error,
            registerConfirmPassword: null,
            registerPassword: null,
          });
        }
        break;
      case "name":
        if (
          !event.target.value
        ) {
          setError({
            ...error,
            registerFullName: "Please Enter Name",
          });
        } else {
          setError({ ...error, registerFullName: null });
        }
        break;
      default:
        break;
    }
  }
  const isDisabled= !(error.registerFullName===null && error.registerEmail===null && error.registerPassword===null && error.registerConfirmPassword===null)
  const handleChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
    handleValidation(e)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserActions.registerUser(registerDetails))
    
  }
  return (
    <div
      className={`container-fluid col-md-12 text-center align-items-center d-flex justify-content-center ${RegisterStyles.height_full}`}
    >
      <ToastContainer />
      <div className={`mx-auto col-md-4 p-4 ${RegisterStyles.innerContainer}`}>
        <form onSubmit={handleSubmit}>
          <h2 className={`my-3`}>Register</h2>
          <div className="my-4">
            <input
              className={`form-control ${
                error.registerFullName ? "is-invalid" : ""
              } ${error.registerFullName === null ? "is-valid" : ""}`}
              name="name"
              type="text"
              onChange={handleChange}
              value={registerDetails.name}
              placeholder="Enter Full Name"
              onBlur={handleValidation}
            />
            {error.registerFullName && (
              <p className="errorText fw-bold">{error.registerFullName}</p>
            )}
          </div>
          <div className="my-4">
            <input
              className={`form-control ${
                error.registerEmail ? "is-invalid" : ""
              } ${error.registerEmail === null ? "is-valid" : ""}`}
              name="email"
              type="email"
              onChange={handleChange}
              value={registerDetails.email}
              onBlur={handleValidation}
              placeholder="Enter Email"
            />
            {error.registerEmail && (
              <p className="errorText fw-bold">{error.registerEmail}</p>
            )}
          </div>
          <div className="my-4">
            <input
              className={`form-control ${
                error.registerPassword ? "is-invalid" : ""
              } ${error.registerPassword === null ? "is-valid" : ""}`}
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleValidation}
              value={registerDetails.password}
              placeholder="Enter Password"
            />
            {error.registerPassword && (
              <p className="errorText fw-bold">{error.registerPassword}</p>
            )}
          </div>
          <div className="my-4">
            <input
              className={`form-control ${
                error.registerConfirmPassword ? "is-invalid" : ""
              } ${error.registerConfirmPassword === null ? "is-valid" : ""}`}
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleValidation}
              value={registerDetails.confirmPassword}
              placeholder="Confirm Password"
            />
            {error.registerConfirmPassword && (
              <p className="errorText fw-bold">
                {error.registerConfirmPassword}
              </p>
            )}
          </div>
          <p className="fw-bold">
            Already a Member?{" "}
            <Link to="/login" className={`text-white`}>
              Sign in
            </Link>
          </p>
          <button className="btn btn-primary" disabled={isDisabled}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
