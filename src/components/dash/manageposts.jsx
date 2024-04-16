
import { Link, json } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './manageposts.css'
import MinimalPost from "../MinimalPost";

export default function () {
    const { info, forceLogin, fetchWeb, setModal } = useInfo();
    if (info == null) return forceLogin();

    if (info?.permissions.post == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [posts, setPosts] = useState(null);

    async function fetchPosts() {
        var data = await fetchWeb(`/posts?fromID=${info?.id}`)
        if (data) setPosts(data)
    }
    async function removePost(postID) {
        var data = await fetchWeb('/posts', {
            method: 'DELETE',
            data: { id: postID }
        })

        setModal(null);
        if (data) {
            let updatedPosts = [...posts]

            let postIndex = null;
            updatedPosts.forEach((postItem, index) => { 
                if (postItem.id == data.id) postIndex = index
            })

            if (postIndex) updatedPosts.splice(postIndex, 1)
            setPosts(updatedPosts)
        }
    }

    const openPostDeletionModal = function (postIndex) {
        const post = posts[postIndex]

        setModal(<>
            <p>Are you sure you want to delete your post '{post.body}'?</p>
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
                    <MinimalPost key={index} post={post} clickable={false} extrabutton={<button onClick={() => openPostDeletionModal(index)}>Remove</button>} />
                ))}
            </div>
        </> : <center>
            <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        </center>
        }
    </article>
}