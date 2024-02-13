
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
                <a key={index} href={`/users/${user.id}`}>
                    <div key={index} className="user">
                        <img src={user.profile} alt="profile" height={64} />
                        <div className="info">
                            <span>{user.username}</span>
                            <span>"{user.status}"</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}