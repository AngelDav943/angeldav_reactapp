
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './profiledetails.css'
import MinimalPost from "../../components/MinimalPost";

export default function () {
    const params = useParams();
    //const { loaded, /*info,*/ forceLogin, getData } = useInfo();

    const [usersLoaded, setLoaded] = useState(false);
    const [user, setUser] = useState([]);

    async function fetchUsers() {
        const userID = parseInt(params["ID"])
        if (isNaN(userID)) return

        var fetchedData = await fetch(`https://datatest.angelddcs.workers.dev/users?id=${userID}&posts=true`);

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setUser(response)
        }
    }

    useEffect(() => { fetchUsers() }, [])

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
                    <a className="post" href={`/posts/${post.id}`} key={index}>
                        <MinimalPost post={post} />
                    </a>
                ))}
                <h2>All posts</h2>
            </section>
        </article>
    </main> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}