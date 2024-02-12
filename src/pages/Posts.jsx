
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'

export default function () {
    const { loaded, /*info,*/ forceLogin, getData } = useInfo();

    const [usersLoaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts');

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setUsers(response)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    return usersLoaded ? <article className="posts">
        <div className="items">
            {users.map((post, index) => (
                <div key={index} className="post">
                    <img src={post.user.profile} alt="profile" height={64} />
                    <div className="info">
                        <span>{post.title}</span>
                        <span>"{post.body}"</span>
                    </div>
                </div>
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}