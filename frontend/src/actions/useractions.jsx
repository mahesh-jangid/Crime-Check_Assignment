import Axios from "axios";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const register = (name, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      password,
    });
    console.log(data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    document.location.href = "/login";
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

export const signin = (name) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { name } });
  try {
    const { data } = await Axios.post("/api/users/login", { name });
    console.log(data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    document.location.href = "/dashboard";
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/login";
};
