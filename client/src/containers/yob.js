import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/authContext'

function Yob() { 
    const {user, setUser} = useContext(AuthContext)
    return (
        <div>
            Yob! {JSON.stringify(user)}
        </div>
    )
}

export default Yob
