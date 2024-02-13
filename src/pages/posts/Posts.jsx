
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'
import Post from "../../components/post";

export default function () {
    const { info } = useInfo();

    const [postsLoaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts');

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setPosts(response)
        }
    }

    useEffect(() => { fetchPosts() }, [])

    return postsLoaded ? <article className="posts">
        <div className="items">
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
            {(info && info?.permissions.post != 0) && <Link to='/posts/create' className="submit">Create post</Link>}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}