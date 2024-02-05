import { createContext, useContext, useEffect, useState } from "react";

const infoContext = createContext()

export const useInfo = () => {
    return useContext(infoContext)
}

const savedToken = JSON.parse(localStorage.getItem("token"))

async function fetchLogin(data) {
    return fetch('https://datatest.angelddcs.workers.dev/users', {
        method: 'POST',
        headers: {
            /*"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers": "Content-Type",*/
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())
}

export function InfoProvider({ children }) {
    const [info, setInfo] = useState({})

    /*useEffect(() => {
        console.log("testtt")
    }, [])*/

    const login = async (username, password) =>  {
        const loginData = await fetchLogin({
            "account": username,
            "password": password,
        });
        /*var newData = info || {}
        newData.name = newName

        setInfo(newData)
        localStorage.setItem("info", JSON.stringify(info))*/
        return loginData
    }

    const count = () => {
        /*var count = parseInt(info?.count || 0)
        var newData = info || {}
        newData.count = count + 1

        setInfo(newData)
        localStorage.setItem("info", JSON.stringify(info))*/
    }

    return (
        <infoContext.Provider value={{ info, login: login }}>
            {children}
        </infoContext.Provider>
    )
}