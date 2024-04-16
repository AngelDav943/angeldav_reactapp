
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './accounts.css'
import UserTile from "../../components/UserTile";

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
                <UserTile user={user} key={index}/>
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}