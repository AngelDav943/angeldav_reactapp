import { createContext, useContext, useEffect, useState } from "react";
import Login from "../pages/Login";

import '../styles/modals.css'
import Notification from "../components/Notification";

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
    const [notifications, setNotificationArray] = useState([]);

    const [modal, setModal] = useState(null)

    const [simpleStatistics, setWebStats] = useState({})

    const exportUtils = {

        setError: (msg) => {
            const message = String(msg);
            if (error == null) setErrorMessage(message)
        },

        addNotification: (icon, title, description) => {
            const notificationID = notifications.length;
            
            const newNotificationArray = [
                {
                    "id": notificationID,
                    "icon": icon,
                    "title": title,
                    "description": description
                },
                ...notifications
            ]
            setNotificationArray(newNotificationArray)
        },

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

                if (response && response["badge_award"] != null) {
                    const badge_award = response["badge_award"]
                    if (badge_award.badge != null && badge_award.success == true) {
                        exportUtils.addNotification(
                            badge_award.badge.image,
                            "You got a badge!",
                            `You obtained the "${badge_award.badge.displayname}" badge!`
                        )
                    }
                }

                return response;
            } catch (error) {
                setErrorMessage(`${String(error)}; client error`)
            }

            return null;
        },

        getData: async () => {
            const webStatistics = await exportUtils.fetchWeb('/stats?simple=true')
            setWebStats(webStatistics)

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

        updateBalance: (amount) => {
            setInfo({
                ...info,
                balance: amount
            })
        },
    }

    useEffect(() => {
        if (info == null) exportUtils.getData()
        if (localStorage.getItem("dark") == "true" && document.body.classList.contains("dark") == false) document.body.classList.add("dark")
    }, [])

    useEffect(() => {
        if (error != null) setTimeout(() => {
            setErrorMessage(null)
        }, 4100)
    }, [[error]])
    
    useEffect(() => {
        if (notifications.length > 0) {
            const latestID = notifications[0].id
            setTimeout(() => {
                setNotificationArray(current => {
                    let newNotifs = [...current];
                    let foundIndex = -1
                    for (let index = 0; index < newNotifs.length; index++) {
                        if (newNotifs[index].id == latestID) foundIndex = index
                    }

                    if (foundIndex != -1) {
                        newNotifs.splice(foundIndex, 1)
                        return newNotifs
                    }

                    return current;
                })
            }, 7900)
        }
    }, [notifications])

    const forceLogin = () => <Login />

    return (
        <infoContext.Provider value={{ info, webStats: simpleStatistics, loaded, ...exportUtils, forceLogin, setModal }}>
            {children}
            {error && <span className="error">{error}</span>}
            <div className="notifications">
                {notifications && notifications.map(notif => (
                    <Notification
                        key={notif.id}
                        iconImage={notif.icon}
                        title={notif.title}
                        description={notif.description}
                    />
                ))}
            </div>
            {modal && <div className="modalcontainer">
                <div className="modal">
                    <button className="close" onClick={() => setModal(null)}>X</button>
                    {modal}
                </div>
            </div>}
        </infoContext.Provider>
    )
}