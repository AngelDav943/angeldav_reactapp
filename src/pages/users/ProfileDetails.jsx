
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './profiledetails.css'
import MinimalPost from "../../components/MinimalPost";

export default function () {
    const { info, fetchWeb } = useInfo();
    const params = useParams();

    const [usersLoaded, setLoaded] = useState(false);
    const [notFound, setFound] = useState(true);
    const [user, setUser] = useState([]);

    const [followers, setFollowers] = useState([]);

    async function fetchUsers() {
        const userID = parseInt(params["ID"])
        if (isNaN(userID)) return

        const data = await fetchWeb(`/users?id=${userID}&posts=true`);
        if (data && data["id"] != null) {
            setUser(data)
            setFollowers(data.followers)
            setLoaded(true)
            return
        }

        setFound(false)
    }

    async function followUser() {
        const userID = parseInt(params["ID"])
        if (isNaN(userID)) return

        if (info == null) return
        const data = await fetchWeb(`/users/follow?id=${userID}`)
        console.log("response:", data)
        if (data && data["followers"]) setFollowers(data.followers);
    }


    useEffect(() => { fetchUsers() }, [])

    if (notFound == false) return <center className='loading'>
        <img src="/images/monitor/monitor_red.png" alt="monitor" height={100} />
        <span>404: User not found.</span>
    </center>

    return usersLoaded ? <main className="profiledetails">
        <article className="central">
            <section className="userdata">
                <div className="header">
                    <div
                        className="banner"
                        style={{ backgroundImage: `url("${user.banner}")` }}
                    />
                    <div className="top">
                        <img src={user.profile} alt="profile" className="profile" />
                        <div className="info">
                            <span className="displayname">{user.displayname}</span>
                            <span className="username">@{user.username}</span>
                            {(info) && <div className="buttons">
                                {String(info.id) != params["ID"] && <span onClick={() => followUser()}>{(info != null && followers.includes(String(info.id))) ? "Unf" : "F"}ollow</span>}
                            </div>}
                        </div>
                    </div>
                </div>
                <span className="radiation">Radiation count: {user["total_likes"]}</span>
                <br />
                <div className="stats">
                    <span>{user.following.length} following</span>
                    <span>{followers.length} follower{followers.length > 1 || followers.length == 0 ? "s" : ""}</span>
                </div>
                <p>"{user.status}"</p>
                <br />
                <Link to={`/badges/${user.id}`}><h3 className="badgelink">Badges ({user?.badges.length})</h3></Link>
                <div className="badges">
                    {user.badges.map(badge => (
                        <div className="badge" key={badge.id}>
                            <img src={badge.image} alt="badge" title={badge.displayname} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="posts">
                {(user.posts != null) && user.posts.map((post, index) => (
                    <MinimalPost post={post} key={index} clickable={true} />
                ))}
                <h2>All posts ({user?.posts.length})</h2>
            </section>
        </article>
    </main> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}