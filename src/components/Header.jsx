import { useInfo } from '../context/useInfo'
import './header.css'
import { Link } from "react-router-dom"

export default function() {
    const { info } = useInfo();

    return (
        <header>
            <img src="/favicon.ico" alt="logo"/>
            <div className="left">
                <nav>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/test"}>Test</Link>
                </nav>
                {info == null ? (
                    <Link className="submit" to={"/dashboard"}>Login</Link>
                ): (
                    <Link to={"/dashboard"}>{info?.username}</Link>
                )}
            </div>
        </header>
    )
}