import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/authContext'

function Home() { 
    const {user} = useContext(AuthContext)
    return (
        <div>
            Yob! {JSON.stringify(user)}
        </div>
    )
}

export default Home
