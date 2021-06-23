import React, { useReducer} from 'react'
// import { v4 as uuidv4 } from 'uuid';
import projectContext from './ProjectContext'
import projectReducer from './ProjectReducer'
import clientAxios from '../../config/axios'


import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  PROJECT_ERROR,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT
} from '../../types'



const ProjectState = props => {


  const initialState = {
    projects : [],
    newProject : false,
    errorForm: false,
    projectPS: null,
    msg: null
  }

  // dispatch to exec actions
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // functions to the project crud
  const giveForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // get the projects
  const getProjects = async () => {

    try {
      const response = await clientAxios.get('/api/projects')
      console.log(response)

      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects
      })
    } catch (error) {
      console.log(error)
    }

    
  }

  // add new project
  const addProjectFromPS = async project =>{

    try {
      const response = await clientAxios.post('/api/projects', project)
      console.log(response)
      
      dispatch({
        type: ADD_PROJECT,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM
    })
  }

  const selectProjectClick = project => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: project
    })
  }

  // elimina un projecto
  const deleteProject = async projectID => {
    try {
      await clientAxios.delete(`/api/projects/${projectID}`)
      dispatch({
        type: DELETE_PROJECT,
        payload: projectID
      })
    } catch (error) {

      const alert = {
        msg: "unexpected error",
        cat: "alerta-error"

      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  return(
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProject: state.newProject,
        errorForm: state.errorForm,
        projectPS: state.projectPS,
        msg: state.msg,
        giveForm,
        getProjects,
        addProjectFromPS,
        showError,
        selectProjectClick,
        deleteProject,
        
      }}
    >
      {props.children}
    </projectContext.Provider>
  )
}

export default ProjectState