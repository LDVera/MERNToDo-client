import React, {Fragment, useContext} from 'react'
import Task from './Taks'
import ProjectContext from '../../context/Projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListTaks = () => {

  const projectContext = useContext(ProjectContext)
  const {projectPS, deleteProject} = projectContext

  // get the func 
  const taskContext = useContext(TaskContext)
  const {projectTaskTS} = taskContext

  

  if(!projectPS) return <h2>selecciona un proyecto</h2>

  // array destruct
  const [ActualProyect] = projectPS

  const onClickDeleteProject = () =>{
    deleteProject(ActualProyect._id)
  }
  return (

    <Fragment>
      <h2>Proyecto: {ActualProyect.projectName}</h2>

      <ul className="listado-tareas">
        {projectTaskTS.length === 0 ?
          (<li className="tarea">No hay tareas</li>)
          :
          <TransitionGroup>
            {projectTaskTS.map(task => (
              <CSSTransition
                key={task._id}
                timeout={220}
                classNames="tarea"
              >
                <Task
                  task={task}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickDeleteProject}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  )
}

export default ListTaks
