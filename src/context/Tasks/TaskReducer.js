import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types'

export default (state, action) => {
   switch (action.type) {
    case TASKS_PROJECT:
    
      return{
        ...state,
        projectTaskTS: action.payload

      }
    
    case ADD_TASK:
      return{
        ...state,
        projectTaskTS: [...state.projectTaskTS, action.payload],
        taskError: false
      }

    case VALIDATE_TASK: 
      return{
        ...state,
        taskError: true
      }

    case DELETE_TASK:
      return{
        ...state,
        projectTaskTS: state.projectTaskTS.filter(tasksM => tasksM._id !== action.payload)
      }

    case UPDATE_TASK:
      return({
        ...state,
        projectTaskTS: state.projectTaskTS.map(task => task._id === action.payload._id ? action.payload : task)
      })

    case ACTUAL_TASK:
      return({
        ...state,
        selectTask: action.payload
      })

    case CLEAN_TASK:
      return({
        ...state,
        selectTask: null
      })

     default:
       return state
   }
}