
import { Link, useParams } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './posts.css'
import Post from "../../components/post";

export default function () {
    const params = useParams();
    const { info } = useInfo();

    const [postLoaded, setLoaded] = useState(false);
    const [post, setPost] = useState([]);

    /*async function fetchUsers() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts');

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) {
            setLoaded(true)
            setUsers(response)
        }
    }

    useEffect(() => { fetchUsers() }, [])*/
    console.log(params)

    return postLoaded ? <article className="posts">
        <div className="items">
            {post.map((post, index) => (
                <Post key={index} post={post} />
            ))}
            {(info && info?.permissions.post != 0) && <Link to='/posts/create' className="submit">Create post</Link>}
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        <span>/postDetails Under construction</span>
    </center>
}