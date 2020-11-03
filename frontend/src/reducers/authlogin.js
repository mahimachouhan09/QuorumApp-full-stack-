import { LOGIN, LOGOUT } from "../actions/actionTypes"

const init = {
  token : localStorage.getItem("token"),
  isAuthenticated : false,
  user : null,
  isLoading : false,
}

export default function authlogin(state = init ,action){
  switch(action.type){
    case LOGIN:
          localStorage.setItem("token" ,action.payload.token)
          return {
              ...state,
              token: localStorage.getItem("token"),
              isAuthenticated : true,
              user : action.payload.user,
          }
      case LOGOUT:
            localStorage.setItem("token",null)
            return {
                ...state,
                token: localStorage.getItem("token"),
                isAuthenticated: false,
                user: null,
                isLoading: false,
            }
      default:
          return state
  }
}