import React, {useContext, useState, useEffect} from 'react'
import ProjectContext from '../../context/Projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'

const FormTask = () => {
  // extract if a project is active
  const projectContext = useContext(ProjectContext)
  const {projectPS} = projectContext

  // get the func 
  const taskContext = useContext(TaskContext)
  const {
    selectTask, 
    addTaskToProject, 
    taskError, 
    validateTask, 
    getTasks, 
    updateTask,
    cleanTask
  } = taskContext 

  useEffect(() => {
    if(selectTask !== null){
      settask(selectTask)
    }else{
      settask({
        name: ''
      })
    }
  }, [selectTask])

  const [task, settask] = useState({
    name: ''
  })

  const { name } = task

  if(!projectPS) return null

  // array destruct
  const [ActualProyect] = projectPS

  // read the form values
  const handleChange = e => {
    settask({
      ...task,
      [e.target.name] : e.target.value
    })
    
  }

  const onSubmitTask = e => {
    e.preventDefault()
    // validates
    if(name.trim() === ''){
      validateTask()
      return
    }

    // edit or new?
    if(selectTask === null){
      // add new task
      task.project = ActualProyect._id
      addTaskToProject(task)
      console.log(task)
    }else{
      updateTask(task)
      cleanTask()
    }

    getTasks(ActualProyect._id)

    // reset form
    settask({
      name: ''
    })
  }

  return (
    <div className="formulario">
      
      <form
        onSubmit={onSubmitTask}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="nombre de tarea"
            name="name" 
            //remember always match the name, value and value into the state should be the same to pass the value into the state correctly
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input type="submit"
            className="btn btn-primario"
            value={selectTask ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {taskError? <p className="mensaje error">todos los campos son obligatorios</p> : null}
    </div>
  )
}

export default FormTask
