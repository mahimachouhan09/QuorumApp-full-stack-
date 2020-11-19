import { GET_QUESTION,QUESTION_LOADING, GET_QUESTION_ERROR, CREATE_QUESTION} from "../actions/actionTypes"

const initialState = {
  loading: false,
  questions: [],
  error: ''
}

const questionsreducer = (state=initialState, action) => {
  switch(action.type) {
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_QUESTION:
      return {
        loading: false,
        questions: action.payload,
        error: ''
      }
    case GET_QUESTION_ERROR:
      return {
        loading: false,
        questions: [],
        error: action.payload
      }
    case CREATE_QUESTION:
      return {questions :action.payload};
    default:
      return state;
  }
}

export default questionsreducer;