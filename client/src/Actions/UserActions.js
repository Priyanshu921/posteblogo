import axios from "axios";
import { BASE_URL } from "../Helper/Utils";
export const userActionTypes = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",
  RESET_LOGIN_USER: "RESET_LOGIN_USER",

  LOGOUT_USER: "LOGOUT_USER",

  REGISTER_USER: "REGISTER_USER",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_ERROR: "REGISTER_USER_ERROR",
  RESET_REGISTER_USER: "RESET_REGISTER_USER",
};

export class UserActions {
  static loginUser = (payload) => {
    return (dispatch) => {
      axios.post(`${BASE_URL}user/login`,payload).then((data)=>{
        dispatch(this.loginUserSuccess(data.data))
      }).catch((error)=>{
        dispatch(this.loginUserError(error))
      })
    };
  };

  static loginUserSuccess = (payload) => {
    return {
      type:userActionTypes.LOGIN_USER_SUCCESS,
      payload
    }
  }
  
  static loginUserError = (payload) => {
    return {
        type:userActionTypes.LOGIN_USER_ERROR,
        payload:payload?.response?.data
    }
  }
  static registerUser = (payload) => {
    return (dispatch) => {
      axios
        .post(`${BASE_URL}user/createuser `, payload)
        .then((data) => {
          dispatch(this.registerUserSuccess(data.data));
        })
        .catch((error) => {
          dispatch(this.registerUserError(error));
        });
    };
  };

  static registerUserSuccess = (payload) => {
    return {
      type:userActionTypes.REGISTER_USER_SUCCESS,
      payload
    }
  }
  
  static registerUserError = (payload) => {
    return {
        type:userActionTypes.REGISTER_USER_ERROR,
        payload:payload?.response?.data
    }
  }

  static resetRegisteredUser = () => {
    return {
        type:userActionTypes.RESET_REGISTER_USER,
    }
  }
  static resetLoginUser = () => {
    return {
        type:userActionTypes.RESET_LOGIN_USER,
    }
  }
  static logoutUser = () => {
    return {
        type:userActionTypes.LOGOUT_USER,
    }
  }

}
