import React, {useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const Login = (props) => {

  const alertContext = useContext(AlertContext)
  const {alert, showAlert} = alertContext

  const authContext = useContext(AuthContext)
  const {loginUser, authentication, msg} = authContext


// if the user is auth, register or a duplicated register
useEffect(() => {
  if(authentication){
    props.history.push('/projects')
  }
  
}, [authentication, props.history])

  useEffect(() => {
    if(msg){
      showAlert(msg.msg, msg.cat)
    }

    // eslint-disable-next-line
  }, [msg])

  // state para iniciar sesion
  const [user, setuser] = useState({
    email: '',
    password: ''
  })

  const {email, password} = user

  const onChange = e => {
    setuser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  // when the user wanna login
  const onSubmit = e => {
    e.preventDefault()

    // validates that the field are not empty
    if(email.trim() === '' || password.trim() === ''){
      showAlert('need all the fields', 'alerta-error')
    }

    // pass data to action
    loginUser({email, password})
  }

  return (
    <div className="form-usuario">
      {alert ? (<div className={`alerta ${alert.cat}`}>{alert.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>iniciar sesion</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="email">
              email
            </label>
            <input 
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="tu email"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">
              password
            </label>
            <input 
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="tu password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>

        <Link to={'/new-account'} className="enlace-cuenta" >
          obtener cuenta
        </Link>
      </div>
    </div>
  )
}

export default Login
