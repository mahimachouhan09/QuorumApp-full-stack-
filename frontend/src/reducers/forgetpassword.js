import {FORGET_PASSWORD_SUCCESS} from "../actions/actionTypes"

const initialState = {
  loading: false,
  email: [],
  error: ''
}

const forgetpassword=(state = initialState, action) => {
  switch(action.type) {
    case FORGET_PASSWORD_SUCCESS:
      return { email: action.payload,}
    default:
      return state;
  }
}

export default forgetpassword;