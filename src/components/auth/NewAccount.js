import React, {useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const NewAccount = (props) => {

  const alertContext = useContext(AlertContext)
  const {alert, showAlert} = alertContext

  const authContext = useContext(AuthContext)
  const {registerUser, authentication, msg} = authContext

  

  // state para iniciar sesion
  const [user, setuser] = useState({
    userName: '',
    userEmail: '',
    password: '',
    confirmPass: ''
  })

  const {userName, userEmail, password, confirmPass} = user

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
    if(userName.trim() === '' || userEmail.trim() === '' || password.trim() === '' || confirmPass.trim() === ''){
      showAlert('need to write in all the inputs', 'alerta-error')
      return
    }

    // password with min 6 characters
    if (password.length < 6){
      showAlert('the pass should have 6 characters as min', 'alerta-error')
      return
    }
    // password and confirm pasword should be the same
    if (password !== confirmPass){
      showAlert('the pass are not the same', 'alerta-error')
    }

    

    // pass data to action
    registerUser({
      name: userName,
      email: userEmail,
      password
    })

    
  }

  // if the user is auth, register or a duplicated register
  useEffect(() => {
    
    if(authentication){
      if(authentication){
        props.history.push('/projects')
        console.log("auth")
      }
    }
  }, [authentication, props.history])

  // this second use efect is used cuz in the last useEffect don't works the msg like a //! input change value
  useEffect(() => {
    if(msg){
      showAlert(msg.msg, msg.cat)
        console.log(msg)
    }

    // eslint-disable-next-line
  }, [msg])

  return (
    <div className="form-usuario">
      {alert ? (<div className={`alerta ${alert.cat}`}>{alert.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener cuenta</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="userName">
              Nombre
            </label>
            <input 
              type="text"
              id="userName"
              name="userName"
              value={userName}
              placeholder="tu nombre"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="userEmail">
              Email
            </label>
            <input 
              type="email"
              id="userEmail"
              name="userEmail"
              value={userEmail}
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
            <label htmlFor="confirmPass">
              confirmar password
            </label>
            <input 
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              placeholder="repite tu password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block"
              value="Registrarse"
            />
          </div>
        </form>

        <Link to={'/new-account'} className="enlace-cuenta" >
          Volver a iniciar sesion
        </Link>
      </div>
    </div>
  )
}

export default NewAccount
