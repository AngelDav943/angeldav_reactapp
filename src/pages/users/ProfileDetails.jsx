
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './profiledetails.css'
import MinimalPost from "../../components/MinimalPost";

export default function () {
    const { fetchWeb } = useInfo();
    const params = useParams();

    const [usersLoaded, setLoaded] = useState(false);
    const [notFound, setFound] = useState(true);
    const [user, setUser] = useState([]);

    async function fetchUsers() {
        const userID = parseInt(params["ID"])
        if (isNaN(userID)) return

        var data = await fetchWeb(`/users?id=${userID}&posts=true`);
        if (data && data["id"] != null) {
            setUser(data)
            setLoaded(true)
            return
        }

        setFound(false)
    }

    useEffect(() => { fetchUsers() }, [])

    if (notFound == false) return <center className='loading'>
        <img src="/images/monitor/monitor_red.png" alt="monitor" height={100} />
        <span>404: User not found.</span>
    </center>

    return usersLoaded ? <main className="profiledetails">
        <article className="central">
            <section className="userdata">
                <div className="top">
                    <img src={user.profile} alt="profile" />
                    <div>
                        <p className="username">@{user.username}</p>
                        <p>Radiation count: {user["total_likes"]}</p>
                    </div>
                </div>
                <p>"{user.status}"</p>
            </section>

            <section className="posts">
                {(user.posts != null) && user.posts.map((post, index) => (
                    <MinimalPost post={post} key={index} clickable={true} />
                ))}
                <h2>All posts</h2>
            </section>
        </article>
    </main> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}