
import { Link, json } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './manageposts.css'

function timeFromTimestamp(timestamp, hidetime) {
    if (isNaN(parseInt(timestamp))) return "";

    const date = new Date(parseInt(timestamp));
    var time = {
        "day": date.getDate(),
        "month": date.getMonth() + 1,
        "year": date.getFullYear(),
        "hours": date.getHours(),
        "minutes": date.getMinutes()
    }

    for (var t in time) {
        if (time[t] < 10) time[t] = `0${time[t]}`
    }

    var timeStampCon = time.day + '/' + time.month + '/' + time.year;
    if (hidetime != true) timeStampCon += " " + time.hours + ':' + time.minutes

    return timeStampCon;
}

export default function () {
    const { info, forceLogin, setError, setModal } = useInfo();
    if (info == null) return forceLogin();

    if (info?.permissions.post == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [posts, setPosts] = useState(null);

    async function fetchPosts() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            headers: { "token": info?.token, "id": info?.id },
        });

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) setPosts(response)
    }
    async function removePost(postID) {

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            method: 'DELETE',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({ id: postID })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        console.log("response:", response)

        setModal(null);
        if (response["msg"]) return setError(response["msg"]);
        fetchPosts();
    }

    const openPostDeletionModal = function (postIndex) {
        const post = posts[postIndex]

        setModal(<>
            <p>Are you sure you want to delete your post with the title of '{post.title}'?</p>
            <div className="buttons">
                <input type="button" value="Cancel" onClick={() => setModal(null)} />
                <input type="submit" value="Confirm" onClick={() => removePost(post.id)} />
            </div>
        </>)
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return <article className="manageposts">
        <div className="title">
            <span>Manage posts</span>
            <Link className="submit" to="/posts/create">Create post</Link>
        </div>

        {posts ? <>
            <div className="posts">
                {posts && posts.map((post, index) => (
                    <article key={index} className="post minimal">
                        <span className='date'>
                            {timeFromTimestamp(post.timestamp)}
                            <button onClick={() => openPostDeletionModal(index)}>Remove</button>
                        </span>
                        <section className="body">
                            <section className="user">
                                <img src={post.user.profile} alt="profile" />
                            </section>
                            <p>
                                <span>@{post.user.username}</span>
                                <span className='title'>{post.title}</span>
                            </p>
                        </section>
                    </article>
                ))}
            </div>
        </> : <center>
            <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        </center>
        }
    </article>
}