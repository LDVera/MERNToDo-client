import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authentication/authContext'



const Bar = () => {

  const authContext = useContext(AuthContext)
  const {user, returnAuthUser, closeSession} = authContext

  useEffect(() => {
    returnAuthUser()
    // eslint-disable-next-line
  }, [])


  return (
    <header className="app-header">
      {user ? <p className="nombre-usuario">Hola <span> {user.name} </span></p> : null}
      <nav className="nav-principal">
        <button 
          className="btn btn-blank btn-eliminar cerrar-sesion" 
          onClick={() => closeSession()}
        > 
          Cerrar Sesion
        </button>
        
      </nav>
    </header>
  )
}

export default Bar
