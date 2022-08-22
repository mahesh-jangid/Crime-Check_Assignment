import {
  NOTICES_REQUEST,
  NOTICES_SUCCESS,
  NOTICE_FAIL,
} from "../constants/noticeConstants";
const initialState = {
  loading: true,
  NoticesArr: [],
  error: false,
};
export const noticeReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTICES_SUCCESS:
      return {
        ...state,
        loading: false,
        NoticesArr: payload,
      };

    case NOTICE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
