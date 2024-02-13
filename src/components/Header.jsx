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
            <img src="/favicon.ico" alt="logo" onClick={() => { setHeaderOpen(!headerOpen) }} />
            <div className="left">
                <nav>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/users"}>Users</NavLink>
                    <NavLink to={"/posts"}>Posts</NavLink>
                    {/* <NavLink to={"/test"}>Test</NavLink> */}
                </nav>
                {info == null ? (
                    <NavLink className="submit" to={"/dashboard"}>Login</NavLink>
                ) : (
                    <a className="profile" onClick={() => setPopupOpen(!popup)}>
                        <img src={prefix + info?.profile} alt="profile" />
                        <span>{info?.username}</span>
                    </a>
                )}
            </div>
            {(info && popup) && <section className="popup">
                <a href={`/users/${info?.id}`}>My profile</a>
                <a href={`/dashboard`}>My dashboard</a>
                <a className='logoff' href={`/dashboard`} onClick={() => logout()}>Log off</a>
            </section>}
        </header>
    )
}