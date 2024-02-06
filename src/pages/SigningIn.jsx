import './login.css'

import { useInfo } from "../context/useInfo"
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function () {
    const { info, login, getData } = useInfo();

    const [username, setUser] = useState();
    const [password, setPass] = useState();
    const [invite, setInv] = useState();

    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        /*const loginData = await login(username, password);
        if (loginData == undefined) return

        if (loginData["error"]) setError(loginData.error);

        if (loginData["success"] == true) getData()*/
    }

    return <main className="login">
        <h2>Create account</h2>
        {error && <span className="error">{error}</span>}
        <span className="error">Account creation currently in development</span>
        <form onSubmit={handleSubmit}>
            <label placeholder="Username">
                <input error={String(error != null)} type="text" id="username" placeholder="Username" onChange={e => setUser(e.target.value)} />
            </label>
            <br />
            <label placeholder="Password">
                <input error={String(error != null)} type="password" id="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
            </label>
            <br />
            <label placeholder="Invite key">
                <input error={String(error != null)} type="text" id="invite" placeholder="Invite key" onChange={e => setInv(e.target.value)} />
            </label>
            <br />
            <br />
            <div className="row">
                <Link className="button" to={"/dashboard"}>Log in</Link>
                <input type="submit" value="Create Account" />
            </div>
        </form>
    </main>
}