import axios from "axios"
import { REGISTER_FAIL, LOGIN, LOGIN_ERROR,LOGOUT,
    QUESTION_LOADING,GET_QUESTION, GET_QUESTION_ERROR,
    GET_PROFILES_REQUEST,GET_PROFILES_SUCCESS,GET_PROFILES_FAILURE,
    GET_FOLLOW_REQUEST,GET_FOLLOW_SUCCESS,GET_FOLLOW_FAILURE,
    GET_FOLLOWER_REQUEST,GET_FOLLOWER_SUCCESS,GET_FOLLOWER_FAILURE,
    CREATE_ANSWER_SUCCESS,CREATE_COMMENT, EDIT_COMMENT,
    FORGET_PASSWORD_SUCCESS, CHANGE_PASSWORD,REGISTER_SUCCESS,
    CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, DELETE_ANSWER,
    EDIT_ANSWER, UPDATE_PROFILE, DELETE_COMMENT, CREATE_PROFILE
  }
from "./actionTypes"
const baseURL = `http://127.0.0.1:8000`

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
  )}
}

  export const register = (username, email, password1, password2) => 
    (dispatch) =>{
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
          });
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
    .then(response => response)
  }
}

export const changepassword = (input) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
    // config.headers['content-type'] = "multipart/form-data";
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


// export const editprofile = (profileData,id) => {
//   return (dispatch,getState) => {
//     const config = setConfig(getState)
//     axios({
//       url :`${baseURL}/profile/${id}/`,config,
//       method :'PUT',
//       data : JSON.stringify(profileData),
//       // headers: {
//       //   'Content-Type': 'application/json'
//       // }
//     })
//     .then(response => response)    
//   }
// }

export const createProfile = (values) => {
  console.log(values)
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/profile/`, values ,config).then((res) => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data    
      })
    })
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
    })
  }
}


// export const follow = (uuid) => (dispatch,getState) => {
//   const config = setConfig(getState)
//   // dispatch({ type: GET_FOLLOW_REQUEST });
//   axios.get(`http://127.0.0.1:8000/follow/${uuid}/`,config).then((response) => {
//     dispatch({ type: GET_FOLLOW_SUCCESS, payload: response.data.results });
//     console.log(response)
//     })
//     .catch((error) => {
//       dispatch({ type: GET_FOLLOW_FAILURE, payload: error.message });
//     });
// };

export const follow = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  const newUrl =`http://127.0.0.1:8000/follow/${id}/`;
  axios
    .get(newUrl,config)
    .then((response) => {
      dispatch({ type: GET_QUESTION, payload: response.data.results });
    })
    .catch((error) => {console.log(error)});
};



export const followers = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  dispatch({ type: GET_FOLLOWER_REQUEST });
  axios.get(`${baseURL}/followers/${id}/`,config).then((response) => {
      dispatch({ type: GET_FOLLOWER_SUCCESS, payload: response.data.results });
      console.log(response)
    })
    .catch((error) => {
      dispatch({ type: GET_FOLLOWER_FAILURE, payload: error.message });
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
    })
  }
}

export const editQuestion = (id, values) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/questions/${id}/`, values, config).then((res) => {
      dispatch({
        type : UPDATE_QUESTION,
        payload : res.data
      })     
    })
  }
}

export const deleteQuestion = (id) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
      axios.delete(`${baseURL}/questions/${id}`,config,)
      .then(res => dispatch({
        type : DELETE_QUESTION,
        payload : res.data
      }) )
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


export const createAnswer = (newAnswer) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/answers/`, newAnswer ,config).then((res) => {
      dispatch({
        type: CREATE_ANSWER_SUCCESS,
        payload: res.data    
      })
    })
  }
}

export const deleteAnswer = (id) => {
  return (dispatch,getState) => {
    const config = setConfig(getState)
      axios.delete(`${baseURL}/answers/${id}`,config,)
      .then(res => dispatch({
        type : DELETE_ANSWER,
        payload : res.data
      }) )
  }
}


export const editAnswer = (id, values) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/answers/${id}/`, values, config).then((res) => {
      dispatch({
        type : EDIT_ANSWER,
        payload : res.data
      })     
    })
  }
}


export const createComment = (newComment) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/comment/`, newComment ,config).then((res) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data    
      })
    })
  }
}


export const editComment = (id, values) => {
  return (dispatch , getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/comment/${id}/`, values, config).then((res) => {
      dispatch({
        type : EDIT_COMMENT,
        payload : res.data
      })     
    })
  }
}


export const deletecomment = (id) => {
  return (dispatch ,getState) => {
    const config = setConfig(getState)
      axios.delete(`${baseURL}/comment/${id}`,config,)
      .then(res => dispatch({
        type : DELETE_COMMENT,
        payload : res.data
      }))
  }
}


export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("token");
    window.location.reload(true);
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