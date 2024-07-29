import { useEffect, useState } from 'react';
import { useInfo } from '../context/useInfo';
import Post from '../components/post';
import UserTile from '../components/UserTile';
import { Link } from 'react-router-dom';

export default function () {
    const { loading, fetchWeb } = useInfo();

    const [webStats, setStatistics] = useState(null);
    const [mostLikedPost, setMostLikedPost] = useState(null)

    async function fetchStatistics() {
        const data = await fetchWeb('/stats');
        if (data) {
            setStatistics(data)

            const fetchedPost = await fetchWeb(`/posts?id=${data.posts.mostliked.id}`);
            if (fetchedPost) setMostLikedPost(fetchedPost)
        }
    }

    useEffect(() => {
        fetchStatistics()
    }, [])

    if (webStats == null) return <center className='loading noicon'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        <p>Loading website's statistics</p>
    </center>

    return <main className="statistics">
        <link rel="stylesheet" href="/styles/pages/stats.css" />
        <h2>Basic website statistics</h2>
        <hr />
        <h3>User statistics</h3>
        <p>Total users: {webStats.users.total}</p>
        <p>Most followed user:</p>
        <UserTile user={webStats.users.mostFollowed} extra={`${webStats.users.mostFollowed.followerCount} followers`} />

        <hr />
        <h3>Posts statistics</h3>
        <p>Total posts: {webStats.posts.total}</p>
        <p>Total radiation: {webStats.posts.totalLikes}</p>
        <h4>Radiation distribution</h4>
        <div className="likeDistribution">
            {Object.keys(webStats.posts.likesDistribution).map(id => {
                const distribution = webStats.posts.likesDistribution[id];
                const percentage = distribution / webStats.posts.totalLikes * 100;
                return <div className='item' key={id} style={{ "--bgcolor": `hsl(${Math.random() * 360}deg 50% 50%)`, "--w": `${Math.round(percentage)}%` }}>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url("https://apiweb.angeld.workers.dev/users/banner?id=${id}")`,
                        }}
                    />
                    <div className="data">
                        <img src={`https://apiweb.angeld.workers.dev/users/profile?id=${id}`} alt="" />
                        <div className='stats'>
                            <span className='percentage'>{Math.round(percentage)}%</span>
                            <span className='distribution'>({distribution})</span>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <br />
        <Link to={`./posts/${webStats.posts.mostliked.id}`}>Most irradiating post</Link>
        {mostLikedPost && <Post clickable={true} post={mostLikedPost} />}
        <hr />
        {/* <code>{JSON.stringify(webStats)}</code> */}
    </main>
}