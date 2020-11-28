import { GET_USERINFO_REQUEST,GET_USERINFO_SUCCESS,GET_USERINFO_FAILURE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  userinfo: [],
  error: ''
}

const userinforeducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_USERINFO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_USERINFO_SUCCESS:
      return {
        loading: false,
        userinfo: action.payload,
        error: ''
      }
    case GET_USERINFO_FAILURE:
      return {
        loading: false,
        userinfo: [],
        error: action.payload
      }
    default:
      return state;
  }
}

export default userinforeducer;