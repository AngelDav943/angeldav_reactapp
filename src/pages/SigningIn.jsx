import './login.css'

import { useInfo } from "../context/useInfo"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function () {
    const { info, login, getData } = useInfo();
    const navigate = useNavigate();

    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [invite, setInv] = useState("");

    const [errorMessage, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users/create', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400",
                "Access-Control-Allow-Headers": "Content-Type",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "invite":invite,
                "username":username,
                "password":password,
            })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) {
            setError(response["msg"])
            return
        }
        
        if (response["user"] != undefined) {
            localStorage.setItem("uid", response.user.userID)
            if (response["success"] == true) {
                await getData();
                navigate("/dashboard")
            }
            return
        }
    }

    return <main className="login">
        <h2>Create account</h2>
        {errorMessage && <span className="error">{errorMessage}</span>}
        {/*<span className="error">Account creation currently in development</span>*/}
        <form onSubmit={handleSubmit}>
            <label placeholder="Username">
                <input error={String(errorMessage != null)} type="text" id="username" placeholder="Username" onChange={e => setUser(e.target.value)} />
            </label>
            <br />
            <label placeholder="Password">
                <input error={String(errorMessage != null)} type="password" id="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
            </label>
            <br />
            <label placeholder="Invite key">
                <input error={String(errorMessage != null)} type="text" id="invite" placeholder="Invite key" onChange={e => setInv(e.target.value)} />
            </label>
            <br />
            <br />
            <div className="row">
                <Link className="button" to={"/dashboard"}>I have an account</Link>
                <input type="submit" value="Create Account" />
            </div>
        </form>
    </main>
}