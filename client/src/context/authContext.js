import React, { useState, createContext } from 'react'

const AuthContext = createContext({
    userId: null,
    isAuthenticated: false,
    login: (uid) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {

    const [uid, setUid] = useState(null)

    const isAuthenticated = !!uid

    const loginHandler = (uid) => {
        setUid(uid)
    }

    const logoutHandler = () => {
        setUid(null)
    }

    const providerValue = {
        userId: uid,
        isAuthenticated: isAuthenticated,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={providerValue}>{props.children}</AuthContext.Provider>

}


export default AuthContext


