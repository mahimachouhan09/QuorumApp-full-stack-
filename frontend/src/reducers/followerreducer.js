import { GET_FOLLOWER_REQUEST,GET_FOLLOWER_SUCCESS,GET_FOLLOWER_FAILURE} from "../actions/actionTypes"

const initialState = {
  loading: false,
  followers: [],
  error: ''
}

const followerreducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_FOLLOWER_SUCCESS:
      return {
        loading: false,
        followers: action.payload,
        error: ''
      }

    case GET_FOLLOWER_FAILURE:
      return {
        loading: false,
        followers: [],
        error: action.payload
      }
      
    default:
      return state;
  }
}

export default followerreducer;