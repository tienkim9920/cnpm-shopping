import React, { createContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [jwt, setJWT] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        localStorage.getItem('jwt') && setJWT(JSON.parse(localStorage.getItem('jwt')));
        localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    const addLocal = (jwt, user) => {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        localStorage.setItem("user", JSON.stringify(user))

        setJWT(jwt);
        setUser(user);
    }

    const logOut = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")

        setJWT();
        setUser();
        <Redirect to="/" />
    }


    return (
        <AuthContext.Provider
            value={{
                jwt,
                user,
                addLocal,
                logOut
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;