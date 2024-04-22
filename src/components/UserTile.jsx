import { Link } from 'react-router-dom'
import './userTile.css'

export default function ({ user, extra }) {

    return <Link className="usertile" to={`/users/${user.id}`}>
        <div className="account">
            <div
                className="banner"
                style={{ backgroundImage: `url("https://datatest.angelddcs.workers.dev/users/banner?id=${user.id}")` }}
            />
            <div className="top">
                <img src={`https://datatest.angelddcs.workers.dev/users/profile?id=${user.id}`} alt="profile" className="profile" />
                <div className="info">
                    <span className="displayname">{user.displayname}</span>
                    <span className="username">@{user.username}</span>
                    <span className="status">{extra}</span>
                </div>
            </div>
        </div>
    </Link>
}