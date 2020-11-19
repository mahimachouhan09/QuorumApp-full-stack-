import { REGISTER_SUCCESS,REGISTER_FAIL } from "../actions/actionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

function registerreducer (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}

export default registerreducer;