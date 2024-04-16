
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './accounts.css'

export default function () {
    //const { loaded, /*info,*/ forceLogin, getData } = useInfo();

    const [usersLoaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users');

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
        <div className="items">
            {users.map((user, index) => (
                <a className="item" key={index} href={`/users/${user.id}`}>
                    <div key={index} className="user">
                        <div
                            className="banner"
                            style={{ backgroundImage: `url("${user.banner}")` }}
                        />
                        <div className="top">
                            <img src={user.profile} alt="profile" className="profile" />
                            <div className="info">
                                <span className="displayname">{user.displayname}</span>
                                <span className="username">@{user.username}</span>
                                <span className="status">"{user.status}"</span>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}