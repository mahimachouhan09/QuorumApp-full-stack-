import {CREATE_ANSWER_SUCCESS} from "../actions/actionTypes"

const initialState = {
  loading: false,
  answer: [],
  error: ''
}

const answerreducer=(state = initialState, action) => {
  switch(action.type) {
    // case 'GET_ANSWERS_SUCCESS':
    //   return action.answers;
    case CREATE_ANSWER_SUCCESS:
      return { answer: action.payload,}
    // case 'UPDATE_ANSWER_SUCCESS':
    //   const index = state.findIndex(answer => answer.id === action.answer.id);
    //   const updatedAnswer = [
    //     ...state.slice(0, index),
    //     action.answer,
    //     ...state.slice(index + 1)
    //   ];
    // return updatedAnswer
    default:
      return state;
  }
}

export default answerreducer;