import {
  REGISTER_DONE,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_DONE,
  LOGIN_ERROR,
  CLOSE_SESSION

} from '../../types/index'

export default (state, action) => {
  switch (action.type) {
    case LOGIN_DONE:
    case REGISTER_DONE:
        localStorage.setItem('token', action.payload.token)
        return{
          ...state,
          authentication: true,
          msg: null,
          charging: false
        }
      
    case GET_USER: 
        return{
          ...state,
          authentication: true,
          user: action.payload,
          charging: false
        }
      
    case CLOSE_SESSION:
    case LOGIN_ERROR:
    case REGISTER_ERROR: 
      localStorage.removeItem('token')
      return{
        ...state,
        token: null,
        user: null,
        authentication: null,
        msg: action.payload,
        charging: false
      }
  
    

    default:
      return state
  }
}