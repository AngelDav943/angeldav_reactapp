import { createContext, useContext, useEffect, useState } from "react";
import Login from "../pages/Login";

import '../styles/modals.css'
import Notification from "../components/Notification";
import utils from "../utils";
import { Navigate, useLocation } from "react-router-dom";

const infoContext = createContext()

export const useInfo = () => {
    return useContext(infoContext)
}

async function fetchLogin(data) {
    var fetchedData = await fetch('https://apiweb.angeld.workers.dev/users', {
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

        fetchWeb: async (path = "/", init = null, isJSON = true, developmentMode = false) => {
            init = init || { method: "GET", headers: null, data: null }

            const apiURL = (import.meta.env.DEV == true && developmentMode == true) ? 'http://127.0.0.1:8787' : 'https://apiweb.angeld.workers.dev'
            const { method, headers, data } = init;

            var fetchMethod = String(method).toUpperCase();
            const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
            if (allowedMethods.indexOf(fetchMethod) == -1) fetchMethod = "GET"

            const body = data != null ? isJSON == true ? { body: JSON.stringify(data) } : { body: data } : null
            const contentType = data != null || isJSON == true ? { "Content-Type": "application/json" } : null

            try {
                var fetchedData = await fetch(`${apiURL}${path}`, {
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

        updateUserdata: (userData) => {
            const savedUserData = utils.parseStringJSON(localStorage.getItem("userdata"));

            const updatedUserdata = {
                ...savedUserData,
                ...userData,
                banner: savedUserData.banner,
                profile: savedUserData.profile,
                lastupdated: Date.now()
            }

            localStorage.setItem("userdata", JSON.stringify(updatedUserdata))
            setInfo(updatedUserdata);
        },

        getData: async () => {
            const savedWebStats = utils.parseStringJSON(localStorage.getItem("webstatistics"));
            let loadedCachedStats = false;

            if (savedWebStats && (Date.now() - (savedWebStats.lastupdated || 0)) < (3600000 * 3) && Object.keys(savedWebStats) > 2) {
                setWebStats(savedWebStats)
            } else {
                const webStatistics = await exportUtils.fetchWeb('/stats?simple=true')
                localStorage.setItem("webstatistics", JSON.stringify({
                    ...webStatistics,
                    lastupdated: Date.now()
                }))
                setWebStats(webStatistics)
            }

            const savedToken = localStorage.getItem("uid")

            const savedUserData = utils.parseStringJSON(localStorage.getItem("userdata"));
            if (savedUserData && (Date.now() - (savedUserData.lastupdated || 0)) < (3600000 * 4) && Object.keys(savedUserData) > 2) {
                setInfo(savedUserData)
                setLoaded(true)
                return savedUserData;
            }


            if (savedToken == null) {
                setLoaded(true)
                return false;
            }

            const userData = await fetchLogin({ "token": savedToken });
            if (userData["token"]) {
                setInfo(userData)
                setLoaded(true)
                localStorage.setItem("userdata", JSON.stringify({
                    ...userData,
                    lastupdated: Date.now()
                }))
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

    return (
        <infoContext.Provider value={{ info, webStats: simpleStatistics, loaded, ...exportUtils, setModal }}>
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

export function RequireAuth({ children }) {
    const { info } = useInfo();
    const location = useLocation();

    return info != null ? children : <Navigate to="/login" replace state={location.pathname} />
}