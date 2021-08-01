import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import AuthContext from '../context/authContext'
import './auth.css'

function Auth(props) {

    // let {user, setUser} = useContext(AuthContext)
    
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [registered, setRegistered] = useState(false)

    const [input, setInput] = useState({ 
        username: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        e.preventDefault()
        let {name, value} = e.target
        setInput({...input, [name]: value})
    }

    const registerHandler = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:8080/user/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": input.username,
                "password": input.password
            })
        })
        .then((response) => {
            setRegistered(true)
            setInput({ 
                username: '',
                password: ''
            })
            console.log('User registered')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const loginHandler = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:8080/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": input.username,
                "password": input.password
            })
        })
        .then((response) => {
            console.log(response.data.message);
            const uid = response.data.message.uid
            auth.login(uid)
            history.push(`/${uid}/places`)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const registerOrLogin = (e) =>{
        e.preventDefault()
        setRegistered((prevState) => !prevState)
    }


    return (
        <div className='auth'>
            <img src="https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/fbdms-ED6JGHW0HR5-Full-Image_GalleryBackground-en-US-1605547891225._SX1080_.jpg" alt="" />
            <form onSubmit={registered ? loginHandler : registerHandler} className='authForm'>
                <p><strong>{registered ? 'Log in' : 'Sign up'}</strong></p>
                <label>Username</label>
                <input onChange={onChangeHandler} type='text' name='username' value={input.username} label='Username'/>
                <label>Password</label>
                <input onChange={onChangeHandler} type='password' name='password' value={input.password} label='Password'/>
                <button type="submit" className='authBtn' type='submit'>{registered ? 'Log in' : 'Sign up'}</button>
                <button onClick={registerOrLogin} className='switchBtn' type="button">
                {registered ? 'New here? Register now' : 'Already have an account? Log in'}
                </button>
            </form>
        </div>
    )
}

export default Auth
