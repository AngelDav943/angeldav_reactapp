
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'
import Post from "../../components/post";
import MinimalPost from "../../components/MinimalPost";
import Bouncy from "../../components/Bouncy";

export default function () {
    const params = useParams();
    const { info, setError, fetchWeb } = useInfo();

    const [postLoaded, setLoaded] = useState(false);
    const [notFound, setFound] = useState(true);
    const [post, setPost] = useState([]);

    const [comment, setComment] = useState([]);

    async function fetchPost() {
        const postID = parseInt(params["postID"]);
        if (isNaN(postID)) {
            setFound(false)
            return
        }

        var data = await fetchWeb(`/posts?id=${postID}`);

        if (data && data.length != 0) {
            setLoaded(true)
            setPost(data)
            return
        }
        setFound(false)
    }

    const submitComment = async () => {
        if (isNaN(post.id)) return setError("Original post not found..");

        var fetchedData = await fetchWeb('/posts/comment', {
            method: 'POST',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            data: { "source": post.id, "body": comment }
        })

        if (fetchedData) {
            setComment("");
            fetchPost();
        }
    }

    useEffect(() => { 
        setLoaded(false)
        fetchPost() 
    }, [params.postID])

    if (notFound == false) return <center className='loading'>
        <img src="/images/monitor/monitor_red.png" alt="monitor" height={100} />
        <h1><Bouncy>Post not found</Bouncy></h1>
        <span>Couldn't get post '{params["postID"]}'</span>
    </center>

    return postLoaded ? <article className="posts">
        <div className="items reverse">
            {post.parent && <Post post={post.parent} clickable={true}/>}
            {post && <Post post={post} />}
            <div className="comments">
                <div className="inputs">
                    <input type="text" placeholder="Comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <input type="submit" placeholder="Comment" onClick={() => submitComment()} />
                </div>
            </div>
            {post.comments && post.comments.map((comment, index) => (
                <MinimalPost post={comment} key={index} clickable={true} />
            ))}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        <span>Loading post details..</span>
    </center>
}