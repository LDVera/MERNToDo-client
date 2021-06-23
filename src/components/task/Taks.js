import React, {useContext} from 'react'
import ProjectContext from '../../context/Projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'

const Taks = ({task}) => {

  const projectContext = useContext(ProjectContext)
  const {projectPS} = projectContext

  const taskContext = useContext(TaskContext)
  const { deleteT, getTasks, updateTask, actualTask } = taskContext

  const [ActualProject] = projectPS

  // func to delete task
  const deleteTaskB = id =>{
    deleteT(id, ActualProject._id)
    getTasks(ActualProject._id)
  }

  const changeState = task => {
    task.state ? task.state = false : task.state = true
    updateTask(task)
  }

  const selectTask = task => {
    actualTask(task)
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.state ? 
          (
            <button
              type="button"
              className="completo"
              onClick={() => changeState(task)}
            >
              completo
            </button>
          )
        :
          (
            <button
              type="button"
              className="incompleto"
              onClick={() => changeState(task)}
            >
              incompleto 
            </button>
          )
        }
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >
          editar
        </button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => deleteTaskB(task._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default Taks
