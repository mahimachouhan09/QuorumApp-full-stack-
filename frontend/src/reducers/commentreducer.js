import {CREATE_COMMENT, EDIT_COMMENT} from "../actions/actionTypes"

const initialState = {
  loading: false,
  comment: [],
  error: ''
}

const commentreducer=(state = initialState, action) => {
  switch(action.type) {

    case CREATE_COMMENT:
      return { comment: action.payload,}

    case EDIT_COMMENT:
        return { comment: action.payload,}

    default:
      return state;
  }
}

export default commentreducer;