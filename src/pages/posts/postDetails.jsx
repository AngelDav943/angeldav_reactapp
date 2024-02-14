
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'
import Post from "../../components/post";
import MinimalPost from "../../components/MinimalPost";

export default function () {
    const params = useParams();
    const { info, setError } = useInfo();

    const [postLoaded, setLoaded] = useState(false);
    const [post, setPost] = useState([]);

    const [comment, setComment] = useState([]);

    //*
    async function fetchPost() {
        const postID = parseInt(params["postID"])
        if (isNaN(postID)) return

        var fetchedData = await fetch(`https://datatest.angelddcs.workers.dev/posts?id=${postID}`);

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setPost(response)
        }
    }

    const submitComment = async () => {
        if (isNaN(post.id)) return setError("Original post not found..");

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts/comment', {
            method: 'POST',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({ "source": post.id, "body": comment })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) return setError(response["msg"]);
        setComment("");
        fetchPost();
    }

    useEffect(() => { fetchPost() }, [])

    return postLoaded ? <article className="posts">
        <div className="items reverse">
            {post.parent && <a className="post" href={`/posts/${post.parent.id}`}>
                <Post post={post.parent} />
            </a>}
            <Post post={post} />
            <div className="comments">
                <div className="inputs">
                    <input type="text" placeholder="Comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <input type="submit" placeholder="Comment" onClick={() => submitComment()} />
                </div>
            </div>
            {post.comments && post.comments.map((comment, index) => (
                <a className="post" href={`/posts/${comment.id}`} key={index}>
                    <MinimalPost post={comment} />
                </a>
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        <span>Loading post details..</span>
    </center>
}