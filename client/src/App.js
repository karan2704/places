import Auth from './containers/auth'
import './App.css';
import Yob from './containers/yob'
import { AuthContext } from './context/authContext'

function App() {
  return (
    <div className="App">
      
      <Auth />
      <Yob />
    </div>
  );
}

export default App;
