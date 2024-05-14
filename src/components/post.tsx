import React from 'react';
import './post.css'

import utils from '../utils';
import { useState } from 'react';
import { useInfo } from '../context/useInfo';
import { Link, useNavigate } from 'react-router-dom';

export default function ({ post, clickable }: { post: any, clickable: boolean }) {
    const { info, webStats, fetchWeb } = useInfo();
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes);

    async function likePost() {
        if (info == null) return
        const data = await fetchWeb('/posts', {
            headers: { "like": post.id }
        })
        if (data && data["likes"]) setLikes(data["likes"]);
    }

    function bodyClick() {
        if (clickable != true) return;
        navigate(`/posts/${post.id}`);
    }

    return <article className={`post ${likes.length >= Math.floor(webStats.users.total * 0.5) && "radiated"} ${clickable == true ? 'clickable' : ''}`}>
        <span className='top' onClick={() => bodyClick()}>
            <div className='author'>
                <span className='displayname'>{post.user.displayname}</span>
                <span className='username'>@{post.user.username}</span>
            </div>
            {utils.timeFromTimestamp(post.timestamp)}
        </span>
        <section className="body">
            <Link className="user" to={`/users/${post.fromID}`}>
                <img src={post.user.profile} alt="profile" />
            </Link>
            <div
                id='content'
                onClick={() => bodyClick()}
                dangerouslySetInnerHTML={{ __html: utils.parseMarkdown(post.body) }}
            />
        </section>
        <span className="info">
            <div className="likes">
                <input
                    disabled={info == null}
                    type='button'
                    className={likes.includes(String(info?.id || '-1')) ? 'liked' : ''}
                    value={likes.length + " radiation"}
                    onClick={() => likePost()}
                />
                <div className="users">
                    {likes.map((userID, index) => {
                        if (index > 5) return;
                        return <img key={index} className='userpreview' src={`https://datatest.angelddcs.workers.dev/users/profile?id=${userID}`} alt={userID} />
                    })}
                </div>
            </div>
            <span className='comments' onClick={() => bodyClick()}>{String(post.commentCount)}</span>
        </span>
    </article>
}
