import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR
} from '../../types'

export default (state, action) => {
  
  switch (action.type) {

  //! always make a copy of the state with ...state

    case FORM_PROJECT:
      return {
        ...state,
        newProject: true
      }
  
    case GET_PROJECTS:      
      return {
        ...state,
        projects: action.payload
      }

    case ADD_PROJECT:
      return{
        ...state,
        projects: [...state.projects, action.payload],
        newProject: false, //* with this the form of the new project was hidden after create the project
        errorForm: false
      }

    case VALIDATE_FORM:
      return{
        ...state,
        errorForm: true
      }

    case ACTUAL_PROJECT:
      return{
        ...state,
        projectPS: state.projects.filter(project => project._id === action.payload)
        
      }

    case DELETE_PROJECT:
      return{
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload), 
        projectPS: null
      }

    case PROJECT_ERROR:
      return{
        ...state,
        msg: action.payload
      }

    default:
      return state
  }
}
