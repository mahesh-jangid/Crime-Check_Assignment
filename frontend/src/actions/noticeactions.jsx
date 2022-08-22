import Axios from "axios";

import {
  NOTICES_REQUEST,
  NOTICES_SUCCESS,
  NOTICE_FAIL,
} from "../constants/noticeConstants";

export const fetchNotices = () => {
  return (dispatch) => {
    dispatch({ type: NOTICES_REQUEST });
    Axios.get(`https://notice-board-01.herokuapp.com/notices/all`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: NOTICES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: NOTICE_FAIL, payload: err.message });
      });
  };
};
