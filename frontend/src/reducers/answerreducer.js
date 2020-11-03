import {CREATE_ANSWER_SUCCESS} from "../actions/actionTypes"

const initialState = {
  loading: false,
  answer: [],
  error: ''
}

const answerreducer=(state = initialState, action) => {
  switch(action.type) {
    case CREATE_ANSWER_SUCCESS:
      return { answer: action.payload,}
      
    default:
      return state;
  }
}

export default answerreducer;