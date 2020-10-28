import { combineReducers } from 'redux';
import users from './users'
import authlogin from './authlogin'
import questionsreducer from './questionsreducer'
import answerreducer from './answerreducer'
import profilereducer from './profilereducer'
import commentreducer from './commentreducer'

export default combineReducers({
  users,
  authlogin,
  questionsreducer,
  answerreducer,
  profilereducer,
  commentreducer,
});