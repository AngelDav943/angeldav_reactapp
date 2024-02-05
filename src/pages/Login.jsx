import './login.css'

import { useInfo } from "../context/useInfo"
import { useState } from 'react';

export default function () {
    const { info, login } = useInfo();

    const [username, setUser] = useState();
    const [password, setPass] = useState();

    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        
        const loginData = await login(username,password);

        console.log(loginData)
        
        //if (loginData.token) setToken(loginData);
    }

    return <main className="login">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
            <label placeholder="Username">
                <input type="text" id="username" placeholder="Username" />
            </label>
            <br />
            <label placeholder="Password">
                <input type="password" id="password" placeholder="Password" />
            </label>
            <br />
            <br />
            <div className="row">
                <input type="button" value="Something" />
                <input type="submit" value="Submit" />
            </div>
        </form>
    </main>
}