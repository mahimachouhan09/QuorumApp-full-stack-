import { combineReducers } from 'redux';
import registerreducer from './registerreducer'
import authlogin from './authlogin'
import questionsreducer from './questionsreducer'
import answerreducer from './answerreducer'
import profilereducer from './profilereducer'
import commentreducer from './commentreducer'
import forgetpassword from './forgetpassword'
import userinforeducer from './userinforeducer'
import followerreducer from './followerreducer'
import followingreducer from './followingreducer'

export default combineReducers({
  registerreducer,
  authlogin,
  userinforeducer,
  questionsreducer,
  answerreducer,
  profilereducer,
  commentreducer,
  forgetpassword,
  followerreducer,
  followingreducer
});