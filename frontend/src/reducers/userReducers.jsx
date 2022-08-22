import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";
const initialState = {
  loading: true,
  userInfo: {},
  error: false,
  isLoggedIn: false,
};
export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isLoggedIn: true,
      };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_SIGNOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
