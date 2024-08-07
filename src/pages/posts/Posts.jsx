
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

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

    return postsLoaded ? <main className="posts">
        <link rel="stylesheet" href="/styles/pages/posts/posts.css" />
        <div className="items">
            {posts.map((post, index) => (
                <Post post={post} key={index} clickable={true} />
            ))}
            {
                (info && info?.permissions.post != 0) &&
                <Link to='/posts/create' className="create">
                    <img src="images/dashboard/edit_posts.png" alt="" />
                    Create post
                </Link>
            }
        </div>
    </main> : <center className='loading' />
}