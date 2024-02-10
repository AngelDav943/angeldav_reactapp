
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './accounts.css'
import InviteTile from "../components/InviteTile";

import Dash_home from "../components/dash/home";
import Dash_invites from "../components/dash/invites";

export default function () {
    const { loaded, /*info,*/ forceLogin, getData } = useInfo();
    //if (info == null) return forceLogin();

    const [usersLoaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users', {
            method: 'GET'
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setUsers(response)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    return usersLoaded ? <article className="users">
        {users.map((user, index) => (
            <div key={index} className="user">
                <img src={user.profile} alt="profile" height={64} />
                <div className="info">
                    <span>{user.username}</span>
                    <span>"{user.status}"</span>
                </div>
            </div>
        ))}
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}