import { GET_PROFILES_REQUEST,GET_PROFILES_SUCCESS,GET_PROFILES_FAILURE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  profiles: [],
  error: ''
}

const profilereducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_PROFILES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILES_SUCCESS:
      return {
        loading: false,
        profiles: action.payload,
        error: ''
      }
    case GET_PROFILES_FAILURE:
      return {
        loading: false,
        profiles: [],
        error: action.payload
      }
    default:
      return state;
  }
}

export default profilereducer;