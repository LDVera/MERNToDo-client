import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Bar from '../layout/Bar'
import FormTask from '../task/FormTask'
import ListTask from '../task/ListTaks'
import AuthContext from '../../context/authentication/authContext'



const Projects = () => {
  
  //* extract the user info 
  const authContext = useContext(AuthContext) 
  const {returnAuthUser} = authContext

  useEffect(() => {
    returnAuthUser()
    // eslint-disable-next-line
  }, [])

  return (
    
    <div className="contenedor-app">
      <Sidebar/>

      <div className="seccion-principal">
        <Bar/>

        <main>
          <FormTask/>
          <ListTask/>
          <div className="contenedor-tarea">

          </div>
        </main>
      </div>
    </div>

  )
}

export default Projects
