
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './profiledetails.css'
import MinimalPost from "../../components/MinimalPost";
import utils from "../../utils";

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
        if (data && data["followers"]) setFollowers(data.followers);
    }

    function getLastOnline(timestamp) {
        const date = new Date(timestamp)
        const difference = Date.now() - date;

        const time = {
            years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25)),
            months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.4375)),
            weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),

            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

        if (time.years > 0) return `Last online ${time.years} year${time.years > 1 ? 's' : ''} ago`
        if (time.months > 0) return `Last online ${time.months} month${time.months > 1 ? 's' : ''} ago`
        if (time.weeks > 0) return `Last online ${time.weeks} week${time.weeks > 1 ? 's' : ''} ago`
        if (time.days > 0) return `Last online ${time.days} day${time.days > 1 ? 's' : ''} ago`
        if (time.hours > 1) return `Last online ${time.hours} hour${time.hours > 1 ? 's' : ''} ago`
        if (time.minutes > 10) return `Last online ${time.minutes} minute${time.minutes > 1 ? 's' : ''} ago`
        if (time.seconds > 0) return `Online`

        return `Last online some time ago`
    }


    useEffect(() => { fetchUsers() }, [])

    if (notFound == false) return <center className='loading noicon'>
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
                        <img src={user.profile} alt="profile" className={`profile ${ Date.now() - user.lastonline < 600000 ? 'online' : '' }`} />
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
                <br />
                <br />
                <div className="stats">
                    <span>{getLastOnline(user.lastonline)}</span>
                    <span>Joined {utils.timeFromTimestamp(user.joindate, true)}</span>
                </div>
            </section>

            <section className="posts">
                {(user.posts != null) && user.posts.map((post, index) => (
                    <MinimalPost post={post} key={index} clickable={true} />
                ))}
                <h2 className="header">All posts ({user?.posts.length})</h2>
            </section>
        </article>
    </main> : <center className='loading' />
}