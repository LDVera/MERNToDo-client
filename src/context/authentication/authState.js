import React, {useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'

import {
  REGISTER_DONE,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_DONE,
  LOGIN_ERROR,
  CLOSE_SESSION

} from '../../types/index'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    authentication: null,
    user: null,
    msg: null,
    charging: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // func to create the user
  const registerUser = async data => {
    try {
      

      const response = await clientAxios.post('/api/users', data)

      dispatch({
        type: REGISTER_DONE,
        payload: response.data
      })

      // get the user
      returnAuthUser()

    } catch (error) {
      // console.log(error.response.data.msg)
      const alert = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }
      
      dispatch({
        type: REGISTER_ERROR,
        payload: alert
      })
    }
  }

  // return the auth user
  const returnAuthUser = async () =>{
    const token = localStorage.getItem('token')
    if(token){
      // func to send the token by headers
      tokenAuth(token)
    }
    try {
      const response = await clientAxios.get('/api/auth')
      // console.log(response.data)
      dispatch({
        type: GET_USER,
        payload: response.data.user
      })

    } catch (error) {
      console.log(error.response)
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  // when the user start session
  const loginUser = async datos => {
    try {
      const response = await clientAxios.post('/api/auth', datos)
      dispatch({
        type: LOGIN_DONE,
        payload: response.data
      })

      // get the user
      returnAuthUser()
      
    } catch (error) {
      console.log(error.response.data.msg)
      const alert = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }
      
      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      })
    }
  }

  const closeSession = ()  => {
    dispatch({
      type: CLOSE_SESSION
    })
  }

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        authentication: state.authentication,
        user: state.user,
        msg: state.msg,
        charging: state.charging,
        registerUser,
        returnAuthUser,
        loginUser,
        closeSession
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState