import { useState } from 'react';
import { useInfo } from '../context/useInfo'
import './header.css'
import { Link } from "react-router-dom"


export default function () {
    const { info, getData } = useInfo();

    const [headerOpen, setHeaderOpen] = useState(false)
    function NavLink({ children, to: target, className }) {
        
        return <Link className={className} to={target} onClick={() => { setHeaderOpen(false); getData(); }}>{children}</Link>
    }

    const prefix = String(info?.profile).includes(".png") ? "/" : ""

    return (
        <header className={headerOpen ? "open" : ""}>
            <img src="/favicon.ico" alt="logo" onClick={() => { setHeaderOpen(!headerOpen) }} />
            <div className="left">
                <nav>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/users"}>Users</NavLink>
                    <NavLink to={"/test"}>Test</NavLink>
                </nav>
                {info == null ? (
                    <NavLink className="submit" to={"/dashboard"}>Login</NavLink>
                ) : (
                    <NavLink className="profile" to={"/dashboard"}>
                        <img src={prefix + info?.profile} alt="profile" />
                        <span>{info?.username}</span>
                    </NavLink>
                )}
            </div>
        </header>
    )
}