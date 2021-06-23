import React, {useContext} from 'react'
import ProjectContext from '../../context/Projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'

const Project = ({projectmap}) => {

  // get the state of the form ( that maybe is newProject state )
  const projectContext = useContext(ProjectContext)
  const {selectProjectClick} = projectContext

  // get the func 
  const taskContext = useContext(TaskContext)
  const {getTasks} = taskContext
  
  
  // func to add the actual project
  const selectProject = id =>{
    selectProjectClick(id)
    getTasks(id)
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(projectmap._id)}
      >
        {projectmap.projectName}
      </button>
    </li>
  )
}

export default Project
