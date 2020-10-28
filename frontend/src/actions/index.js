import axios from "axios"
import { LOGIN, LOGIN_ERROR,LOGOUT,
    QUESTION_LOADING,GET_QUESTION, GET_QUESTION_ERROR,
    GET_PROFILES_REQUEST,GET_PROFILES_SUCCESS,GET_PROFILES_FAILURE,
    GET_FOLLOW_REQUEST,GET_FOLLOW_SUCCESS,GET_FOLLOW_FAILURE,
    GET_FOLLOWER_REQUEST,GET_FOLLOWER_SUCCESS,GET_FOLLOWER_FAILURE,
    CREATE_ANSWER_SUCCESS,CREATE_COMMENT,
  }
from "./actionTypes"

export const login = (values ,callBack) => {
  return (dispatch) => {
      axios.post("http://127.0.0.1:8000/rest-auth/login/",values).then( (res) => {
          dispatch({
              type : LOGIN,
              payload : res.data
          })
      } ,(err) =>{
          dispatch({
              type: LOGIN_ERROR,
              payload: err.response.data
          })
          callBack()
      }
  )}
}

export const getprofiles = () => (dispatch,getState) => {
  dispatch({ type: GET_PROFILES_REQUEST });
  const config = setConfig(getState)
  axios
    .get(`http://127.0.0.1:8000/users/`,config)
    .then((response) => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_PROFILES_FAILURE, payload: error.message });
    });
};


export const editprofile = (profileData,id) => {
  return (dispatch) => {
    axios({
      url :`http://127.0.0.1:8000/update-profile/${id}`,
      method :'PUT',
      data : JSON.stringify(profileData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response)    
  }
}

export const follow = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  // console.log('id',id,'config',config)
  dispatch({ type: GET_FOLLOW_REQUEST });
  axios
    .get(`http://127.0.0.1:8000/follow/${id}/`,config)
    .then((response) => {
      dispatch({ type: GET_FOLLOW_SUCCESS, payload: response.data.results });
      console.log(response)
    })
    .catch((error) => {
      dispatch({ type: GET_FOLLOW_FAILURE, payload: error.message });
    });
};

export const followers = (id) => (dispatch,getState) => {
  const config = setConfig(getState)
  dispatch({ type: GET_FOLLOWER_REQUEST });
  axios
    .get(`http://127.0.0.1:8000/followers/${id}/`,config)
    .then((response) => {
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
    .get(`http://127.0.0.1:8000/questions/`,config)
    .then((response) => {
      dispatch({ type: GET_QUESTION, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_QUESTION_ERROR, payload: error.message });
    });
};

// const addQuestion = question => {
//   return {
//     type: 'CREATE_QUESTION_SUCCESS',
//     question
//   }
// }
//   export const createQuestion = (question, routerHistory) => {
//     return dispatch => {
//       return fetch(`http://127.0.0.1:8000/questions/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question: question }),
//       })
//         .then(response => response.json())
//         .then(question => {
//           dispatch(addQuestion(question));
//           routerHistory.replace(`/questions/${question.id}`)
//       })
//         .catch(error => console.log(error))
//     }
//   }


  export const createQuestion = (newquestion) => {
    return (dispatch,getState) => {
      const config = setConfig(getState)
      axios({
        url :`http://127.0.0.1:8000/questions/`,config,
        method :'POST',
        data : JSON.stringify(newquestion),
        headers: {
          'Content-Type': 'application/json',
          // ...config.headers,
        }
      })
      .then(response => response)
    }
  }
  

  export const searchquestion = (questions) => {
    return (dispatch,getState) => {
      const config = setConfig(getState)
      axios
      .get(`http://127.0.0.1:8000/questions/?search=${questions}`,config)
      .then(response => {
        const question = response.data
        dispatch(getquestionSuccess(question))
      })
      .catch(error => {
        dispatch(getquestionFailure(error.message))
      })

    }
  }
  
  export const getquestionRequest = () => {
    return {
      type: QUESTION_LOADING, 
    }
  }
  
  export const getquestionSuccess = question => {
    return {
      type: GET_QUESTION,
      payload: question
    }
  }
  
  export const getquestionFailure = error => {
    return {
      type: GET_QUESTION_ERROR,
      payload: error
    }
  }

  // export const createAnswer = (newAnswer) => {
  //   return (dispatch,getState) => {
  //     const config = setConfig(getState)
  //       axios({
  //       url :`http://127.0.0.1:8000/answers/`,config,
  //       method :'POST',
  //       data : JSON.stringify(newAnswer),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // ...config.headers,
  //       }
  //     })
  //     // return fetch(`http://127.0.0.1:8000/answers/`,newAnswer,config, {
  //     //   method: 'POST',
  //     // })
  //       .then(response => response.json())
  //       .then(answer => {
  //         console.log("answer",answer)
  //         dispatch(({ type: CREATE_ANSWER_SUCCESS, payload: answer }));
  //     })
  //       .catch(error => console.log(error))
  //   }
  // }

  export const createAnswer = (newAnswer) => {
    return (dispatch , getState) => {
        const config = setConfig(getState)
        axios.post(`http://127.0.0.1:8000/answers/`, newAnswer ,config).then((res) => {
            dispatch({
                type: CREATE_ANSWER_SUCCESS,
                payload: res.data    
            })
          
        })
    }
}


export const createComment = (newComment) => {
  return (dispatch , getState) => {
      const config = setConfig(getState)
      axios.post(`http://127.0.0.1:8000/comment/`, newComment ,config).then((res) => {
          dispatch({
              type: CREATE_COMMENT,
              payload: res.data    
          })
        
      })
  }
}


export const deletecomment = (id) => {
  return (getState) => {
    const config = setConfig(getState)
      axios.delete(`http://127.0.0.1:8000/comment/${id}`,config,)
      .then(response => response)
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