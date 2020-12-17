import {GET_FAV_QUESTION_LOADING, GET_FAV_QUESTION , GET_FAV_QUESTION_ERROR,} from "../actions/actionTypes"

const initialState = {
  loading: false,
  favquestions: [],
  error: ''
}

const listFavQuesReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_FAV_QUESTION_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_FAV_QUESTION:
      return {
        loading: false,
        favquestions: action.payload,
        error: ''
      }
    case  GET_FAV_QUESTION_ERROR:
      return {
        loading: false,
        favquestions: [],
        error: action.payload
      }
    default:
      return state;
  }
}

export default listFavQuesReducer;