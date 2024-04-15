import './post.css'

import utils from '../utils';
import { useState } from 'react';
import { useInfo } from '../context/useInfo';
import { useNavigate } from 'react-router-dom';



export default function ({ post, clickable }) {
    const { info, fetchWeb } = useInfo();
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likesCount);

    async function likePost() {
        if (info == null) return
        const data = await fetchWeb('/posts', {
            headers: { "like": post.id }
        })
        if (data && data["likesCount"]) setLikes(data["likesCount"]);
    }

    function bodyClick() {
        if (clickable != true) return;
        navigate(`/posts/${post.id}`);
    }

    return <article className={`post ${clickable == true ? 'clickable' : ''}`}>
        <span className='top' onClick={() => bodyClick()}>
            <div className='author'>
                <span className='displayname'>{post.user.displayname}</span>
                <span className='username'>@{post.user.username}</span>
            </div>
            {utils.timeFromTimestamp(post.timestamp)}
        </span>
        <section className="body">
            <a className="user" href={`/users/${post.fromID}`}>
                <img src={post.user.profile} alt="profile" />
            </a>
            <p onClick={() => bodyClick()}>{String(post.body).split("\n").map((item, index) => (
                <span key={index}>{item}</span>
            ))}</p>
        </section>
        <span className="info">
            <input disabled={info == null} type='button' className='likes' value={likes + " radiation"} onClick={() => likePost()} />
            <span className='comments' onClick={() => bodyClick()}>{String(post.commentCount)}</span>
        </span>
    </article>
}
