
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './dashboard.css'
import InviteTile from "../components/InviteTile";

import Dash_home from "../components/dash/home";
import Dash_invites from "../components/dash/invites";
import AdminPage from "../components/dash/AdminPage";
import Avatarcreator from "../components/dash/avatarcreator";

export default function () {
    const { loaded, info, forceLogin, logout } = useInfo();
    if (info == null) return forceLogin();

    const [currentPage, setPage] = useState("Home")
    var pages = {
        "Home": <Dash_home />,
        "Invites": <Dash_invites />,
        "Avatar creator": <Avatarcreator />
    }

    if (info.permissions["admin"] != 0) pages["Admin"] = <AdminPage />

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return <main className="dashboard">
        <section className="dash">
            <aside className={sidebarOpen ? "open" : ""}>
                <div className="top">
                    <button className="sidebar" onClick={() => { setSidebarOpen(!sidebarOpen) }}>
                        Close sidebar
                    </button>
                    {Object.keys(pages).map(page => (
                        <input type="button" key={page} onClick={() => { setPage(page); setSidebarOpen(false) }} value={page} />
                    ))}
                </div>
                <input type="submit" value="Log out" onClick={logout} />
            </aside>
            <section className="page">
                <button className="sidebar" onClick={() => { setSidebarOpen(!sidebarOpen) }}>
                    Open sidebar
                </button>
                {pages[currentPage]}
            </section>
        </section>
    </main>
}