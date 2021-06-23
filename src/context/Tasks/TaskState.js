import React, {useReducer} from 'react'
import taskContext from './TaskContext'
import TaskReducer from './TaskReducer'
import clientAxios from '../../config/axios'

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types'

const TaskState = props => {
  const initialState ={

    projectTaskTS: [], //* use this to storage the task
    taskError: false,
    selectTask: null
  } 
  
  const [state, dispatch] = useReducer(TaskReducer, initialState)

  // get project tasks
  const getTasks = async project =>{
    try {
      const response = await clientAxios.get('/api/task/', { params: {project}})
      dispatch({
        type: TASKS_PROJECT,
        payload: response.data.task
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addTaskToProject = async task => {

    try {
      const response = await clientAxios.post('/api/task', task)
      
      dispatch({
        type: ADD_TASK,
        payload: response.data
      })

    } catch (error) {
      console.log(error)
    }
    
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,

    })
  }

  const deleteT = async (id, project) => {
    try {
      const response = await clientAxios.delete(`/api/task/${id}`, {params: {project}})
      console.log(response)
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } catch (error) {
      console.log(error)
    }
  }

  // change the state between complete/incomplete task
  const updateTask = async task =>{
    console.log(task)

    try {
      
      const response = await clientAxios.put(`/api/task/${task._id}`, task)
      console.log(response)

      dispatch({
        type: UPDATE_TASK,
        payload: task
      })

    } catch (error) {
      
    }
  }

  const actualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK
    }) 
  }
  return(
    <taskContext.Provider
      value={{
        projectTaskTS: state.projectTaskTS,
        taskError: state.taskError,
        selectTask: state.selectTask,
        getTasks,
        addTaskToProject,
        validateTask,
        deleteT,
        actualTask,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </taskContext.Provider>
  )
}

export default TaskState
