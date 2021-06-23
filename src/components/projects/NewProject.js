import React, {Fragment, useState, useContext} from 'react'
import ProjectContext from '../../context/Projects/ProjectContext'

const NewProject = () => {

  const projectContext = useContext(ProjectContext)
  const {newProject, errorForm, giveForm, addProjectFromPS, showError} = projectContext
  
  // state to the project
  const [project, setproject] = useState({
    projectName : ''
  })

  const {projectName} = project

  // read the content of the inputs
  const onChangeProject = e =>{
    setproject({
      ...project,
      [e.target.name] : [e.target.value]
    })
    
  }

  const onSubmitProject = e =>{
    e.preventDefault()

    // validates the project
    if(projectName === '') {
      showError()
      return
    }

    // add the state
    addProjectFromPS(project)
    // console.log(project)

    // reset the form
    setproject({
      projectName: ''
    })

  }

// show the form
  const onClickNewTask = ( ) => {
    giveForm()
  }
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickNewTask}
      >
        Nuevo proyecto
      </button>

      {newProject ? 
        (
          <form 
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProject}
          >

            <input 
              type="text"
              className="input-text"
              placeholder="Nombre del proyecto"
              name="projectName"
              value={projectName}
              onChange={onChangeProject}
            />

            <input 
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar Proyecto"
              

            />
          </form>
        ):null}
        {errorForm ? <p className="mensaje error">el nombre del projecto es obligatorio</p> : null }

    </Fragment>
  )
}

export default NewProject
