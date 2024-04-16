import { useInfo } from '../context/useInfo';
import './stats.css'

export default function () {
    const { loading, webStats, fetchWeb } = useInfo();

    return <main className="statistics">
        <h2>Basic website statistics:</h2>
        <p>Total users: {webStats.users.total}</p>
        <hr />
        <h3>Posts statistics</h3>
        <p>Total posts: {webStats.posts.total}</p>
        <p>Total radiation: {webStats.posts.totalLikes}</p>
        <h4>Distribution</h4>
        <div className="likeDistribution">
            {Object.keys(webStats.posts.likesDistribution).map(id => {
                const distribution = webStats.posts.likesDistribution[id];
                const percentage = distribution / webStats.posts.totalLikes * 100;
                return <div className='item' key={id} style={{ "--bgcolor": `hsl(${Math.random() * 360}deg 50% 50%)`, "--w": `${Math.round(percentage)}%` }}>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url("https://datatest.angelddcs.workers.dev/users/banner?id=${id}")`,
                        }}
                    />
                    <div className="data">
                        <img src={`https://datatest.angelddcs.workers.dev/users/profile?id=${id}`} alt="" />
                        <div className='stats'>
                            <span className='percentage'>{Math.round(percentage)}%</span>
                            <span className='distribution'>({distribution})</span>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <br />
        <a href={`./posts${webStats.posts.mostliked.id}`}>Most liked post</a>
        {/* <code>{JSON.stringify(webStats)}</code> */}
    </main>
}