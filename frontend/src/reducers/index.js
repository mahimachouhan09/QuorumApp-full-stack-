import { combineReducers } from 'redux';
import users from './users'
import authlogin from './authlogin'
import questionsreducer from './questionsreducer'
import answersreducer from './answersreducer'
import profilereducer from './profilereducer'

export default combineReducers({
  users,
  authlogin,
  questionsreducer,
  answersreducer,
  profilereducer,
});