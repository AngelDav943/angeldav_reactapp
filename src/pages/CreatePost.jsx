
import { Link, useNavigate } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './createpost.css'
import Post from "../components/post";

export default function () {
    const { info, forceLogin, setError, setModal } = useInfo();
    const navigate = useNavigate();
    if (info == null) return forceLogin();

    if (info?.permissions.post == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    /*async function fetchUsers() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users');

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) setUsers(response)
    }*/

    const handleSubmit = async e => {
        e.preventDefault();
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            method: 'POST',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({
                "title": title,
                "body": body
            })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) return setError(response["msg"]);
        navigate('/posts');
    }

    return <article className="createpost">
        <div className="editor">
            <Post post={{ "title": title, "body": body, "user": info, "timestamp": Date.now() }} />

            <form onSubmit={handleSubmit}>
                <label placeholder="Title">
                    <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Body
                    <textarea name="" id="" cols="30" onChange={(e) => { setBody(e.target.value) }} />
                </label>
                <br />
                <br />
                <div className="row">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    </article>
}