import { createContext, useContext, useEffect, useState } from "react";
import Login from "../pages/Login";

const infoContext = createContext()
infoContext["forcelogin"] = false

export const useInfo = (forcelogin) => {
    infoContext["forcelogin"] = forcelogin || false
    return useContext(infoContext)
}

const savedToken = JSON.parse(localStorage.getItem("token"))

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

    const getData = async () => {
        const savedData = localStorage.getItem("uid")
        if (savedData == null) {
            setLoaded(true)
            return false;
        }

        var loginParameters = null
        try {
            loginParameters = JSON.parse(savedData)
        } catch (error) {
            setLoaded(true)
            return false;
        }

        const userData = await fetchLogin(loginParameters);
        if (userData["userID"]) {
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
    }, [])

    const login = async (username, password) => {
        const loginData = await fetchLogin({
            "username": username,
            "password": password,
        });
        
        if (loginData["userID"] == null) return {
            "error": loginData["msg"]
        }

        localStorage.setItem("uid", JSON.stringify({ "username": loginData.username, "token": loginData.userID }))
        return {"success": true}
    }

    const forceLogin = () => <Login/>

    return (
        <infoContext.Provider value={{ loaded, info, login, forceLogin, getData }}>
            {children}
        </infoContext.Provider>
    )
}