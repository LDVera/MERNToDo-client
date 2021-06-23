import React, {useContext, useEffect} from 'react'
import Project from './Project'
import ProjectContext from '../../context/Projects/ProjectContext'
import AlertContext from '../../context/alerts/alertContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const ListProjects = () => {

  // extract projects from inicial state
  const projectContext = useContext(ProjectContext)
  const {msg, projects, getProjects} = projectContext
  
  const alertContext = useContext(AlertContext)
  const {alert, showAlert} = alertContext

  // get the projects when the component charges
  useEffect(() => {
    if(msg){
      showAlert(msg.msg, msg.cat)
    }

    getProjects()  
    // eslint-disable-next-line
  }, [msg])

  // review if projects have content
  if(projects.length === 0) return <p>no hay projectos crea alguno</p>

  return (
    <ul className="listProjects">

    {alert? (<div className={`alerta ${alert.cat}`}>{alert.msg}</div>) : null }

      <TransitionGroup>
      {projects.map(projectmap => (
        <CSSTransition
          key={projectmap._id}
          timeout={3000}
          classNames="proyecto"
        >
          <Project
            
            projectmap={projectmap}
          />
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ul>
  )
}

export default ListProjects
