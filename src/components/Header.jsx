import { useState } from 'react';
import { useInfo } from '../context/useInfo'
import './header.css'
import { Link } from "react-router-dom"


export default function () {
    const { info, getData, logout } = useInfo();

    const [headerOpen, setHeaderOpen] = useState(false)
    const [popup, setPopupOpen] = useState(false)

    function navClick() {
        setHeaderOpen(false);
        if (getData != null) getData();
    }

    function NavLink({ children, to: target, className }) {
        return <Link className={className} to={target} onClick={() => navClick()}>{children}</Link>
    }

    var prefix = ""
    if (info != null) prefix = String(info?.profile).includes(".png") ? "/" : ""

    return (
        <header className={headerOpen ? "open" : ""}>
            <img draggable={false} src={document.getElementById("favicon").href || "/favicon.ico"} alt="logo" onClick={() => { setHeaderOpen(!headerOpen) }} />
            <div className="left">
                <nav>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/users"}>Users</NavLink>
                    <NavLink to={"/posts"}>Posts</NavLink>
                </nav>
                {info == null ? (
                    <NavLink className="submit" to={"/dashboard"}>Login</NavLink>
                ) : (
                    <div className="profile" onClick={() => setPopupOpen(!popup)}>
                        <img src={prefix + info?.profile} alt="profile" draggable={false} />
                        <span>@{info?.username}</span>
                    </div>
                )}
            </div>
            {(info && popup) && <section className="popup">
                <NavLink to={`/users/${info?.id}`}>My profile</NavLink>
                <NavLink to={`/dashboard`}>My dashboard</NavLink>
                <NavLink to={`/dashboard`} className='logoff' onClick={() => logout()}>Log off</NavLink>
            </section>}
        </header>
    )
}