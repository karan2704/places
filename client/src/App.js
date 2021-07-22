import React, {useState, useMemo} from 'react'
import Auth from './containers/auth'
import './App.css';
import Home from './containers/home'
import { AuthContext } from './context/authContext'

function App() {

  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <AuthContext.Provider value={providerValue} >
    <Home />
    <Auth />
    </AuthContext.Provider>
  );
}

export default App;
