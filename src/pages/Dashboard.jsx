
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './dashboard.css'
import InviteTile from "../components/InviteTile";

export default function () {
    const { loaded, info, forceLogin, logout } = useInfo();
    if (info == null) return forceLogin();

    return <main className="dashboard">
        <section>
            <article className="info">
                <p>Hello {info?.username}</p>
            </article>
        </section>
        <section>
            <article className="info">
                <Link to="/invites">Invites</Link>
                <br />
                <input type="submit" value="Log out" onClick={logout} />
            </article>
        </section>
    </main>
}