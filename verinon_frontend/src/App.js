import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './components/user-feature/LoginComponent';
import RegisterComponent from './components/user-feature/RegisterComponent'
import DashboardComponent from './components/data-feature/DashboardComponent'
import HeaderComponent from './components/shared-components/HeaderComponent'
import AuthenticatedRoute from './components/user-feature/AuthenticatedRoute'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <HeaderComponent />
          <div className="content">
            <Switch>
              <Route exact path="/" component={RegisterComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute path="/dashboard" component={DashboardComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
