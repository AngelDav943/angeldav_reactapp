import { createContext, useContext, useEffect, useState } from "react";
import Login from "../pages/Login";

import '../styles/modals.css'

const infoContext = createContext()

export const useInfo = () => {
    return useContext(infoContext)
}

async function fetchLogin(data) {
    var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers": "Content-Type",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    var response = fetchedData.json().catch(err => {
        return { msg: String(err) }
    })

    return response
}

export function InfoProvider({ children }) {
    const [loaded, setLoaded] = useState(false)
    const [info, setInfo] = useState(null)

    const [error, setErrorMessage] = useState(null)
    const [modal, setModal] = useState(null)

    const getData = async () => {
        const savedToken = localStorage.getItem("uid")
        if (savedToken == null) {
            setLoaded(true)
            return false;
        }

        const userData = await fetchLogin({ "token": savedToken });
        if (userData["token"]) {
            setInfo(userData)
            setLoaded(true)
        } else {
            setLoaded(true)
            return false;
        }

        return userData
    }

    useEffect(() => {
        if (info == null) getData()
        if (localStorage.getItem("dark") == "true" && document.body.classList.contains("dark") == false) document.body.classList.add("dark")
    }, [])

    useEffect(() => {
        if (error != null) setTimeout(() => {
            setErrorMessage(null)
        }, 4100)
    }, [[error]])

    const login = async (username, password) => {
        const loginData = await fetchLogin({
            "username": username,
            "password": password,
        });

        if (loginData["token"] == null) return {
            "error": loginData["msg"]
        }

        localStorage.setItem("uid", loginData.token)
        return { "success": true }
    }

    const logout = () => {
        localStorage.setItem("uid", undefined)
        setInfo(null);
    }

    const setError = (msg) => {
        const message = String(msg);
        if (error == null) setErrorMessage(message)
    }

    const forceLogin = () => <Login />

    return (
        <infoContext.Provider value={{ loaded, info, login, logout, forceLogin, getData, setError, setModal }}>
            {children}
            {error && <span className="error">{error}</span>}
            {modal && <div className="modalcontainer">
                <div className="modal">
                    <button className="close" onClick={() => setModal(null)}>X</button>
                    {modal}
                </div>
            </div>}
        </infoContext.Provider>
    )
}