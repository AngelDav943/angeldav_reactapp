import './post.css'

import utils from '../utils';
import { useState } from 'react';
import { useInfo } from '../context/useInfo';



export default function ({ post }) {
    const { info, fetchWeb} = useInfo();
    const [likes, setLikes] = useState(post.likes);
    console.log(post)
    const comments = isNaN(post.comments) ? post.comments.length : post.comments

    async function likePost() {
        if (info == null) return

        const fetchedData = await fetchWeb('/posts', {
            headers: {"like": post.id}
        })

        if (fetchedData && fetchedData["likes"]) setLikes(fetchedData["likes"]);
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
                    <span>{comments} comment{Math.abs(comments) > 1 || comments == 0 ? "s" : ""}</span>
                </div>
            </section>
            <p>{String(post.body).split("\n").map((item, index) => (
                <span key={index}>{item}</span>
            ))}</p>
        </section>
    </article>
}
