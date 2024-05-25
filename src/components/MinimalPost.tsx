import React from 'react';

import './post.css'
import utils from '../utils'
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../context/useInfo';
import { useEffect, useState } from 'react';

export default function ({ post, extrabutton = null, clickable = false }) {
    const { info, webStats, fetchWeb } = useInfo();
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes);

    async function likePost(): Promise<void> {
        if (info == null) return
        const data = await fetchWeb('/posts', {
            headers: { "like": post.id }
        })
        if (data && data["likes"]) setLikes(data["likes"]);
    }

    function bodyClick(override: boolean = false): void {
        if (clickable != true && override != true) return;
        navigate(`/posts/${post.id}`);
    }
    

    return <article className={`post minimal ${likes.length >= Math.floor(webStats.users.total * 0.5) && "radiated"} ${clickable == true ? 'clickable' : ''}`}>
        <span className='top' onClick={() => bodyClick()}>
            <div>
                {extrabutton}
                <span>@{post.user.username}</span>
            </div>
            {utils.timeFromTimestamp(post.timestamp)}
        </span>
        <section className="body">
            <section className="user">
                <img src={post.user.profile} alt="profile" />
            </section>
            <div
                id='content'
                onClick={() => bodyClick()}
                dangerouslySetInnerHTML={{ __html: utils.parseMarkdown(post.body) }}
            />
        </section>
        <span className="info">
            <input disabled={info == null} type='button' className='likes' value={likes.length + " radiation"} onClick={() => likePost()} />
            <span className='comments' onClick={() => bodyClick(true)}>{String(post.commentCount)}</span>
        </span>
    </article>
}