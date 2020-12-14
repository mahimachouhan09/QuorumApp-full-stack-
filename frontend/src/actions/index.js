import axios from "axios"
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN, LOGIN_ERROR,LOGOUT,
    FORGET_PASSWORD_SUCCESS,CHANGE_PASSWORD,
    GET_USERINFO_REQUEST,GET_USERINFO_SUCCESS,GET_USERINFO_FAILURE,EDIT_USER_INFO,
    GET_PROFILES_REQUEST,GET_PROFILES_SUCCESS,GET_PROFILES_FAILURE,
    QUESTION_LOADING,GET_QUESTION, GET_QUESTION_ERROR,
    GET_FOLLOWER_REQUEST,GET_FOLLOWER_SUCCESS,GET_FOLLOWER_FAILURE,
    GET_FOLLOWING_REQUEST,GET_FOLLOWING_SUCCESS,GET_FOLLOWING_FAILURE,
    CREATE_ANSWER_SUCCESS,CREATE_COMMENT, EDIT_COMMENT,
    CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, DELETE_ANSWER,
    EDIT_ANSWER, UPDATE_PROFILE, DELETE_COMMENT, CREATE_PROFILE,FOLLOW_SUCCESS,FOLLOW_FAILURE,
    VOTE_QUESTION, UPDATE_QUESTION_VOTE, DELETE_QUESTION_VOTE
  }
from "./actionTypes"
const baseURL = `http://127.0.0.1:8000`


export const register = (username, email, password1, password2) => (dispatch) =>{
  axios.post(`${baseURL}/rest-auth/registration/`, {
    username, email, password1, password2,}).then( (res) => {
      dispatch({
        type : REGISTER_SUCCESS,
        payload : res.data
      })
      alert("registered successfully.")
    })
  .catch((error) => {
    dispatch({ type: REGISTER_FAIL, payload: error.message });
    alert("username or email already registered")
  });
}


export const login = (values ,callBack) => {
  return (dispatch) => {
    axios.post(`${baseURL}/rest-auth/login/`,values).then( (res) => {
      dispatch({
        type : LOGIN,
        payload : res.data
      })
    } ,(err) =>{
          dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data
          })
          alert("Enter correct username and password")
          callBack()
        }
    )
  }
}


export const forgetpassword = (email) => {
  return (dispatch) => {
    const headers = {'Content-Type': 'multipart/form-data' }
    axios({
      url :`${baseURL}/password/reset/`,
      method :'POST',
      data : email,
      headers
    })
    .then(response => {
      dispatch({
        type : FORGET_PASSWORD_SUCCESS,
        payload : response.data
      })
      alert("email has been sent to email address.")
    } )
  }
}


export const changepassword = (input) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
      axios.post(`${baseURL}/rest-auth/password/change/`,input,config
      ).then( (res) => {
        dispatch({
          type : CHANGE_PASSWORD,
          payload : res.data
        })
        alert("password changed successfully.")
      }
  )}
}

export const getUserInfo = () => (dispatch,getState) => {
  dispatch({ type: GET_USERINFO_REQUEST });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/rest-auth/user/`,config)
    .then((response) => {
      dispatch({ type: GET_USERINFO_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: GET_USERINFO_FAILURE, payload: error.message });
    });
};


export const editUserInfo = (values,callBack) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
      axios.put(`${baseURL}/rest-auth/user/`, values, config).then((res) =>  {
        callBack();
        dispatch({
          type: EDIT_USER_INFO,
          payload: res.data
        })
    })
  }
  }


export const getprofiles = () => (dispatch,getState) => {
  dispatch({ type: GET_PROFILES_REQUEST });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/profile/`,config)
    .then((response) => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_PROFILES_FAILURE, payload: error.message });
    });
};


export const searchProfile = (profiles) => (dispatch,getState) => {
  dispatch({ type: GET_PROFILES_REQUEST });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/profile/?search=${profiles}`,config)
    .then((response) => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_PROFILES_FAILURE, payload: error.message });
    });
};


export const createProfile = (values) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/profile/`, values ,config).then((res) => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data    
      })
      alert("profile created successfully!!")
    },alert("Profile can not be created again"))
  }
}


export const editprofile = ( values,id) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    config.headers['content-type'] = "multipart/form-data";
    axios.put(`${baseURL}/profile/${id}/`, values, config).then((res) => {
      dispatch({
        type : UPDATE_PROFILE,
        payload : res.data
      })
      alert("profile edited successfully!!")     
    })
  }
}

export const follow = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  const newUrl =`http://127.0.0.1:8000/follow/${id}/`;
  axios
    .get(newUrl,config)
    .then((response) => {
      dispatch({ type: FOLLOW_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({type: FOLLOW_FAILURE, payload: error.message })});
};


export const followers = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  dispatch({ type: GET_FOLLOWER_REQUEST });
  axios.get(`${baseURL}/followers/${id}/`,config).then((response) => {
      dispatch({ type: GET_FOLLOWER_SUCCESS, payload: response.data});
    })
  .catch((error) => {
    dispatch({ type: GET_FOLLOWER_FAILURE, payload: error.message });
  });
};

export const following = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  dispatch({ type: GET_FOLLOWING_REQUEST });
  axios.get(`${baseURL}/following/${id}/`,config).then((response) => {
    console.log('following response',response)
      dispatch({ type: GET_FOLLOWING_SUCCESS, payload: response.data});
    })
  .catch((error) => {
    dispatch({ type: GET_FOLLOWING_FAILURE, payload: error.message });
  });
};

export const getQuestions = () => (dispatch,getState) => {
  dispatch({ type: QUESTION_LOADING });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/questions/`,config)
    .then((response) => {
      dispatch({ type: GET_QUESTION, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_QUESTION_ERROR, payload: error.message });
    });
};


export const createQuestion = (newquestion) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/questions/`, newquestion ,config).then((res) => {
      dispatch({
        type: CREATE_QUESTION,
        payload: res.data    
      })
      alert("question created successfully")
    })
  }
}

export const editQuestion = (id, values,callBack) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/questions/${id}/`, values, config).then((res) => {
      callBack();
      dispatch({
        type : UPDATE_QUESTION,
        payload : res.data
      })
      alert("question edited successfully")     
    })
  }
}

export const deleteQuestion = (id,callBack) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
      axios.delete(`${baseURL}/questions/${id}`,config,)
      .then((res) => {
        callBack();
        dispatch({
        type : DELETE_QUESTION,
        payload : res.data
      })
      alert("question deleted ")
    }
    )
  }
}


export const searchQuestions = (username) => (dispatch,getState) => {
  dispatch({ type: QUESTION_LOADING });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/questions/?search=${username}`,config)
    .then((response) => {
      dispatch({ type: GET_QUESTION, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_QUESTION_ERROR, payload: error.message });
    });
};


export const voteQuestion = (vote) => (dispatch,getState) => {
  const config = setConfig(getState)
  axios
    .post(`${baseURL}/questionvote/`,vote, config)
    .then((response) => {
      dispatch({ type: VOTE_QUESTION, payload: response.data });
    })
};


export const updateQuestionVote = (id, vote) => (dispatch,getState) => {
  const config = setConfig(getState)
  axios
    .put(`${baseURL}/questionvote/${id}/`,vote, config)
    .then((response) => {
      dispatch({ type: UPDATE_QUESTION_VOTE, payload: response.data });
    })
};


export const deleteQuestioneVote = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  axios
    .delete(`${baseURL}/questionvote/${id}/`, config)
    .then((response) => {
      dispatch({ type: DELETE_QUESTION_VOTE, payload: response.data });
    })
};


export const createAnswer = (newAnswer,callBack) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/answers/`, newAnswer ,config).then((res) => {
      callBack();
      dispatch({
        type: CREATE_ANSWER_SUCCESS,
        payload: res.data    
      })
      alert("answer created successfully")
    })
  }
}

export const deleteAnswer = (id,callBack) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
      axios.delete(`${baseURL}/answers/${id}`,config,)
      .then(res => {
        callBack();
        dispatch({
        type : DELETE_ANSWER,
        payload : res.data
      })} )
  }
}


export const editAnswer = (id, values,callBack) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/answers/${id}/`, values, config).then((res) => {
      callBack();
      dispatch({
        type : EDIT_ANSWER,
        payload : res.data
      })
      alert("answer edited successfully")    
    })
  }
}


export const createComment = (newComment,callBack) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/comment/`, newComment ,config).then((res) => {
      callBack();
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data    
      })
    })
  }
}


export const editComment = (id, values,callBack) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/comment/${id}/`, values, config).then((res) => {
      callBack();
      dispatch({
        type : EDIT_COMMENT,
        payload : res.data
      })     
    })
  }
}


export const deletecomment = (id,callBack) => {
  return (dispatch ,getState) => {
    const config = setConfig(getState)    // this config is to store token for authorization
      axios.delete(`${baseURL}/comment/${id}`,config,)
      .then(res =>{
        callBack();
        dispatch({
        type : DELETE_COMMENT,
        payload : res.data
      })}
      )
  }
}


export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT});
  };


export const setConfig = (getState) =>{
  let config = null;
  const token =  getState().authlogin.token
  if (token){
    config = {
      headers : {
        Authorization : `token ${token}`
      }
    }
  }
  return config
}