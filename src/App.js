import React from 'react'
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Projects from './components/projects/Projects'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import ProjectState from './context/Projects/ProjectState'
import TaskState from './context/Tasks/TaskState'
import AlertaState from './context/alerts/alertState'
import AuthState from './context/authentication/authState'
import tokenAuth from './config/tokenAuth'
import PrivateRoute from './components/routes/PrivateRoute'

// check if have a token
const token = localStorage.getItem('token')
if(token){
  tokenAuth(token)
}

function App() {

  return (
    <ProjectState>
      <TaskState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/new-account" component={NewAccount}/>
                <PrivateRoute exact path="/projects" component={Projects}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
