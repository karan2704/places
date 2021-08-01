import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import {AuthContextProvider} from './context/authContext'


ReactDOM.render(
<AuthContextProvider>
    <App/>
</AuthContextProvider>,
 document.getElementById('root'));  


