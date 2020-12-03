import {GET_FOLLOWING_REQUEST,GET_FOLLOWING_SUCCESS,GET_FOLLOWING_FAILURE} from "../actions/actionTypes"

const initialState = {
  loading: false,
  following: [],
  error: ''
}

const followingreducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_FOLLOWING_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_FOLLOWING_SUCCESS:
      return {
        loading: false,
        following: action.payload,
        error: ''
      }

      case GET_FOLLOWING_FAILURE:
      return {
        loading: false,
        following: [],
        error: action.payload
      }
      
    default:
      return state;
  }
}

export default followingreducer;