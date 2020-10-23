import axios from "axios"
import {  LOGIN, LOGIN_ERROR,
    QUESTION_LOADING,GET_QUESTION, GET_QUESTION_ERROR
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
// export const getQuestions = (callBack) => {
//   return (dispatch,getState) => {
//     console.log('res')
//     // const config = setConfig(getState)
//     axios({
//       url :`http://127.0.0.1:8000/questions/`,
//       method :'GET',
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }) 
//       .then( (res) => {
//         console.log(res)
//           dispatch({
//               type: GET_QUESTION,
//               payload : res.data
//           })
//           callBack()
//       })  
//   }
// } 
export const getQuestions = () => (dispatch,getState) => {
  dispatch({ type: QUESTION_LOADING });
  const config = setConfig(getState)
  console.log(config)
  axios
    .get(`http://127.0.0.1:8000/questions/`,config)
    .then((response) => {
      dispatch({ type: GET_QUESTION, payload: response.data.results });
      console.log(response)
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


  export const createQuestion = (newQuestion) => {
    return (dispatch) => {
      axios({
        url :`http://127.0.0.1:8000/questions/`,
        method :'POST',
        data : JSON.stringify(newQuestion),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response)
    }
  }
  

export const setConfig = (getState) =>{
    let config = null;
    const token =  getState().authlogin.token
    console.log(token)
    if (token){
        config = {
            headers : {
                Authorization : `token ${token}`
            }
        }
    }
    
    return config
}