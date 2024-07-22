import './login.css'

import { useInfo } from "../context/useInfo"
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function () {
    const { info, login, getData } = useInfo();

    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUser] = useState();
    const [password, setPass] = useState();

    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const loginData = await login(username, password);
        if (loginData == undefined) return

        if (loginData["error"]) setError(loginData.error);

        if (loginData["success"] == true) {
            if (await getData() && location.state) navigate(location.state)
        }
    }

    return <main className="login">
	<div className="modal">
        <h2>Log in</h2>
        {error && <span className="error">{error}</span>}
        <form onSubmit={handleSubmit}>
            <label placeholder="Username">
                <input error={String(error != null)} type="text" id="username" placeholder="Username" onChange={e => setUser(e.target.value)} />
            </label>
            <br />
            <label placeholder="Password">
                <input error={String(error != null)} type="password" id="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
            </label>
            <br />
            <br />
            <div className="row">
                <Link className="button" to={"/signin"}>Create account</Link>
                <input type="submit" value="Submit" />
            </div>
        </form>
	</div>
    </main>
}
