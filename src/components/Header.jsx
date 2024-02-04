import './header.css'
import { Link } from "react-router-dom"

export default function() {
    return (
        <header>
            <img src="/favicon.ico" alt="logo"/>
            <div className="left">
                <nav>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/test"}>Test</Link>
                </nav>
                <div className="monitor"></div>
            </div>
        </header>
    )
}