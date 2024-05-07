
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'
import Post from "../../components/post";

export default function () {
    const { info, fetchWeb } = useInfo();

    const [postsLoaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        var fetchedData = await fetchWeb('/posts');
        if (fetchedData) {
            setLoaded(true)
            setPosts(fetchedData)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return postsLoaded ? <article className="posts">
        <div className="items">
            {posts.map((post, index) => (
                <Post post={post} key={index} clickable={true}/>
            ))}
            {(info && info?.permissions.post != 0) && <Link to='/posts/create' className="submit">Create post</Link>}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>
}