import React, {useState} from 'react'
import axios from 'axios'
import './auth.css'
function Auth() {

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
            data: input
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className='auth'>
            <img src="https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/fbdms-ED6JGHW0HR5-Full-Image_GalleryBackground-en-US-1605547891225._SX1080_.jpg" alt="" />
            <form onSubmit={registerHandler} className='authForm'>
                <p><strong>Sign up</strong></p>
                <label>Username</label>
                <input onChange={onChangeHandler} type='text' name='username' value={input.username} label='Username'/>
                <label>Password</label>
                <input onChange={onChangeHandler} type='password' name='password' value={input.password} label='Password'/>
                <button type="submit" className='authBtn' type='submit'>Sign Up</button>
                <button className='switchBtn' type="button">Already have an account? Log in</button>
            </form>
        </div>
    )
}

export default Auth
