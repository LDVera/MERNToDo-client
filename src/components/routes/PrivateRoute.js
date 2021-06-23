import React, {useContext, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/authentication/authContext'


const PrivateRoute = ({component: Component, ...props}) => {

  const authContext = useContext(AuthContext)
  const { authentication, returnAuthUser, charging } = authContext

  useEffect(() => {
    returnAuthUser()

    // eslint-diseable-next-line
  }, [])

  return (
    <Route {...props} render={props => !authentication && !charging ? (
        <Redirect to="/" />
      )  
      : 
      (
        <Component {...props} />
      ) } />
  )
}

export default PrivateRoute
