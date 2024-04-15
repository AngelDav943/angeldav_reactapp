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

    const [webStats, setWebStats] = useState({})

    const exportUtils = {

        fetchWeb: async (path = "/", init = null) => {
            init = init || { method: "GET", headers: null, data: null }

            const { method, headers, data } = init;

            var fetchMethod = String(method).toUpperCase();
            const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
            if (allowedMethods.indexOf(fetchMethod) == -1) fetchMethod = "GET"

            const body = data != null ? { body: JSON.stringify(data) } : null
            const contentType = data != null ? { "Content-Type": "application/json" } : null

            try {
                var fetchedData = await fetch(`https://datatest.angelddcs.workers.dev${path}`, {
                    method: fetchMethod,
                    headers: { "token": info?.token, ...contentType, ...headers },
                    ...body
                })

                const response = await fetchedData.json();
                if (response["msg"]) {
                    setErrorMessage(response["msg"])
                    return null;
                }
                return response;
            } catch (error) {
                setErrorMessage(`${String(error)}; client error`)
            }

            return null;
        },

        getData: async () => {
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
        },

        login: async (username, password) => {
            const loginData = await fetchLogin({
                "username": username,
                "password": password,
            });

            if (loginData["token"] == null) return {
                "error": loginData["msg"]
            }

            localStorage.setItem("uid", loginData.token)
            return { "success": true }
        },

        logout: () => {
            localStorage.setItem("uid", undefined)
            setInfo(null);
        },

        setError: (msg) => {
            const message = String(msg);
            if (error == null) setErrorMessage(message)
        }

    }

    async function getStats() {
        const data = await exportUtils.fetchWeb('/stats')
        setWebStats(data)
    }

    useEffect(() => {
        getStats()
        if (info == null) exportUtils.getData()
        if (localStorage.getItem("dark") == "true" && document.body.classList.contains("dark") == false) document.body.classList.add("dark")
    }, [])

    useEffect(() => {
        if (error != null) setTimeout(() => {
            setErrorMessage(null)
        }, 4100)
    }, [[error]])

    const forceLogin = () => <Login />

    return (
        <infoContext.Provider value={{ info, userStats: webStats, loaded, ...exportUtils, forceLogin, setModal }}>
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