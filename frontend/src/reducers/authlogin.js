import { LOGIN, LOGOUT } from "../actions/actionTypes"

const init = {
  token : null,
  isAuthenticated : false,
  user : null,
  isLoading : false,
}

export default function authlogin(state = init ,action){
  switch(action.type){
    case LOGIN:
          return {
              ...state,
              token: action.payload.token,
              isAuthenticated : true,
              user : action.payload.user,
          }
    case LOGOUT:
            return {
                ...state,
                token: init.token,
                isAuthenticated: init.isAuthenticated,
                user: init.user,
            }
    default:
          return state
  }
}