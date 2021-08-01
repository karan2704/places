import {useState, useContext} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import Auth from './containers/auth'
import './App.css';
import Home from './containers/home'
import AuthContext from './context/authContext'


function App() {

    
  const {isAuthenticated} = useContext(AuthContext)
  let routes

  if(!isAuthenticated){
    routes = (
      <Switch>
        <Route path="/:uid/places" exact component={withRouter(Home)} />
        {/* <Route path="/:uid/new" exact component={withRouter(AddPlace)} />  */}
        <Redirect to="/:uid/places" component={withRouter(Home)} />
     </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact component={withRouter(Auth)} />
        <Redirect to="/auth"  component={withRouter(Auth)} />
      </Switch>
    )}

  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
