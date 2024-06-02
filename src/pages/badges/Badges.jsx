
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import UserTile from '../../components/UserTile'

import './badges.css'

export default function () {
    const { info, fetchWeb } = useInfo();
    const params = useParams();

    const [badgesLoaded, setLoaded] = useState(false);

    const [targetUser, setUser] = useState(null);
    const [badges, setBadges] = useState([]);

    async function fetchBadges() {
        const response = await fetchWeb('/badges');

        let userID = parseInt(params["userID"])
        if (info != null && isNaN(userID)) userID = info?.id

        if (isNaN(userID) == false) {
            const userData = await fetchWeb(`/users?id=${userID}`);
            setUser(userData)
        }
        
        if (response["msg"] == undefined) {
            setLoaded(true)
            setBadges(response)
        }
    }

    useEffect(() => { fetchBadges() }, [])

    return badgesLoaded ? <article className="badges">
        {targetUser && <div className="profilepreview">
            <div
                className="banner"
                style={{ backgroundImage: `url("${targetUser.banner}")` }}
            />
            <div className="top">
                <img src={targetUser.profile} alt="profile" className="profile" />
                <div className="info">
                    <span className="displayname">{targetUser.displayname}</span>
                    <span className="username">@{targetUser.username}</span>
                </div>
            </div>
        </div>}

        <div className="items">
            {targetUser && <h2>{(info?.id == targetUser.id) ? "Your b" : "B"}adges ({targetUser.badges.length})</h2>}
            {badges.map((badge) => {
                let isObtained = false
                if (targetUser) for (let i = 0; i < targetUser.badges.length; i++) {
                    if (targetUser.badges[i].id == badge.id) {
                        isObtained = true
                        break;
                    }
                }

                return <div key={badge.id} className={`badge ${isObtained ? "obtained" : ""}`}>
                    <img src={badge.image} alt="" />
                    <div className="info">
                        <span className="name">{badge.displayname}</span>
                        <span className="description">"{badge.description}"</span>
                    </div>
                </div>
            })}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}