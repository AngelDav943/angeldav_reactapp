
import { Link, useNavigate } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './createpost.css'
import Post from "../../components/post";

import utils from "../../utils";

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

    const handleSubmit = async e => {
        e.preventDefault();
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            method: 'POST',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({ "body": body })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) return setError(response["msg"]);
        navigate('/posts');
    }

    return <article className="createpost">
        <div className="editor">
            <form onSubmit={handleSubmit}>
                <br />
                <article className="post">
                    <span className='top'>
                        <span className='username'>@{info?.username}</span>
                        {utils.timeFromTimestamp(Date.now())}
                    </span>
                    <section className="body">
                        <section className="user">
                            <img src={info?.profile} alt="profile" />
                            <div className="info">
                                <span className='title'>{title}</span>
                            </div>
                        </section>
                        <p contentEditable={true} onInput={(e) => { setBody(e.target.innerText) }}></p>
                    </section>
                </article>
                <br />
                <div className="row">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    </article>
}