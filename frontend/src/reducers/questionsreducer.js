import answersreducer from './answersreducer';
import { GET_QUESTION,QUESTION_LOADING, GET_QUESTION_ERROR } from "../actions/actionTypes"

const initialState = {
  loading: false,
  questions: [],
  error: ''
}

const questionsreducer=(state =  initialState, action) => {
  console.log(action.type)
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

    // case 'CREATE_QUESTION_SUCCESS':
    //   return state.concat(action.question);
    // case 'DELETE_QUESTION_SUCCESS': { 
    //   const index = state.findIndex(question => question.id == action.questionId);
    //   const removedQuestionObject = [
    //         ...state.slice(0, index),
    //         ...state.slice(index + 1)
    //         ];
    //   return removedQuestionObject
    //   }
    // case 'CREATE_ANSWER_SUCCESS':
    // case 'UPDATE_ANSWER_SUCCESS':
    //   const index = state.findIndex(question => question.id == action.questionId);
    //   const question = state[index]
    //   const updatedQuestion = Object.assign( {}, question, { answers: answersReducer(question.answers, action) })
    //       const updatedQuestions = [
    //       ...state.slice(0, index),
    //       updatedQuestion,
    //       ...state.slice(index + 1)
    //       ];
    //   return updatedQuestions
    default:
      return state;
  }
}

export default questionsreducer;