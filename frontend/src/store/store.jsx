import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { noticeReducers } from "../reducers/noticeReducers";

import {
  userRegisterReducer,
  userSigninReducer,
} from "../reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  notices: noticeReducers,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});
const composeEnhancer = compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
