
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

    //*
    async function fetchPost() {
        const postID = parseInt(params["postID"])
        console.log("id:", postID)

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

    useEffect(() => { fetchPost() }, [])
    // console.log(params)
    //*/

    return postLoaded ? <article className="posts">
        <div className="items reverse">
            <Post post={post} />
            <div className="comments">
                <div className="inputs">
                    <input type="text" placeholder="Comment" />
                    <input type="submit" placeholder="Comment" />
                </div>
            </div>
        </div>
    </article> : <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        <span>Loading post details..</span>
    </center>
}