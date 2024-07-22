import React from 'react';
import { Link } from 'react-router-dom'
import './userTile.css'

export default function ({ user, extra }: { user: any, extra: string }) {

    return <Link className="usertile" to={`/users/${user.id}`}>
        <div className="account overlapper">
            <div
                className="banner"
                style={{ backgroundImage: `url("https://apiweb.angeld.workers.dev/users/banner?id=${user.id}")` }}
            />
            <div className="top">
                <img
                    src={`https://apiweb.angeld.workers.dev/users/profile?id=${user.id}`}
                    alt="profile"
                    className={`profile ${Date.now() - user.lastonline < 600000 ? 'online' : ''}`}
                />
                <div className="info">
                    <span className="displayname">{user.displayname}</span>
                    <span className="username">@{user.username}</span>
                    <span className="status">{extra}</span>
                </div>
            </div>
        </div>
    </Link>
}