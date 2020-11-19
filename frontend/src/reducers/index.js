import { combineReducers } from 'redux';
import registerreducer from './registerreducer'
import authlogin from './authlogin'
import questionsreducer from './questionsreducer'
import answerreducer from './answerreducer'
import profilereducer from './profilereducer'
import commentreducer from './commentreducer'
import forgetpassword from './forgetpassword'

export default combineReducers({
  registerreducer,
  authlogin,
  questionsreducer,
  answerreducer,
  profilereducer,
  commentreducer,
  forgetpassword
});