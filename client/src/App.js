import {useState, useCallback, createContext} from 'react'
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
import { AuthContext } from './context/authContext'

export const authContext = createContext({
  authenticated: true,
  userId: '',
  username: '',
  login: () => {},
  logout: () => {}
});

function App() {

  // const [user, setUser] = useState(null)
  // const providerValue = useMemo(() => ({user, setUser}), [user, setUser])

  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  

  const login = useCallback((uid, name) => {
    console.log(uid);
    setAuthenticated(true)
    setUserId(uid)
    setUsername(name)
  }, [userId, authenticated, username])

  const logout = useCallback(() => {
    setAuthenticated(false)
    setUserId(null)
    setUsername(null)
  }, [])

  let routes

  if(authenticated){
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
    <AuthContext.Provider
    value = {{authenticated: authenticated, userId: userId, username: username, login: login, logout: logout}} >
    <Router>
      {routes}
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
