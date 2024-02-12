import './post.css'

import utils from '../utils';
import { useState } from 'react';
import { useInfo } from '../context/useInfo';



export default function ({ post }) {
    const { info, setError} = useInfo();
    const [likes, setLikes] = useState(post.likes);

    async function likePost() {
        if (info == null) return

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            headers: { "token": info?.token, "like": post.id },
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })
        console.log("resp", response)

        if (response["msg"]) return setError(response["msg"]);
        if (response["likes"]) setLikes(response["likes"]);
    }

    return <article className="post">
        <span className='top'>
            <span className='username'>@{post.user.username}</span>
            {utils.timeFromTimestamp(post.timestamp)}
        </span>
        <section className="body">
            <section className="user">
                <img src={post.user.profile} alt="profile" />
                <div className="info">
                    <input disabled={info == null} type='button' className='likes' value={likes +" radiation"} onClick={() => likePost()}/>
                    <span className='title'>{post.title}</span>
                </div>
            </section>
            <p>{String(post.body).split("\n").map((item, index) => (
                <span key={index}>{item}</span>
            ))}</p>
        </section>
    </article>
}
