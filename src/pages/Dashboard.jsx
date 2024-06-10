
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './dashboard.css'

import Dash_home from "../components/dash/home";
import Dash_invites from "../components/dash/invites";
import AdminPage from "../components/dash/AdminPage";
import Avatarcreator from "../components/dash/avatarcreator";
import Manageposts from "../components/dash/manageposts";

export default function () {
    const { info, forceLogin, logout, setModal } = useInfo();
    if (info == null) return forceLogin();

    const [currentPage, setPage] = useState("home")
    var pages = {
        "home": <Dash_home />,
        "invites": <Dash_invites />,
        "avatar_editor": <Avatarcreator />,
    }

    if (info?.permissions["post"] != 0) pages["edit_posts"] = <Manageposts />
    if (info?.permissions["admin"] != 0) pages["admin"] = <AdminPage />

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return <main className="dashboard">
        <section className="dash">
            <aside className={sidebarOpen ? "open" : ""}>
                <div className="top">
                    <button className="sidebar" onClick={() => { setSidebarOpen(!sidebarOpen) }}>
                        Close sidebar
                    </button>
                    {Object.keys(pages).map(page => {
                        let displayName = page.replace(/_/g," ");
                        displayName = displayName[0].toLocaleUpperCase() + displayName.slice(1)

                        return (
                            <button
                                className={`page ${currentPage == page ? "selected" : ""}`}
                                key={page}
                                onClick={() => { setPage(page); setSidebarOpen(false) }}
                            >
                                <img draggable={false} src={`images/dashboard/${page}.png`} alt="" />
                                {displayName}
                            </button>
                        )
                    })}
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