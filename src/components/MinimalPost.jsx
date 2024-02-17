import './post.css'
import utils from '../utils'
import { useNavigate } from 'react-router-dom';

export default function ({ post, extrabutton, clickable }) {
    const navigate = useNavigate();
    const commentCount = post.comments != null ? (post.comments["length"] != undefined) ? post.comments.length : post.comments : 0

    function bodyClick() {
        if (clickable != true) return;
        navigate(`/posts/${post.id}`);
    }

    return <article className={`post minimal ${clickable == true ? 'clickable' : ''}`}>
        <span className='top' onClick={() => bodyClick()}>
            <div>
                {extrabutton}
                <span>@{post.user.username}</span>
            </div>
            {utils.timeFromTimestamp(post.timestamp)}
        </span>
        <section className="body">
            <section className="user">
                <img src={post.user.profile} alt="profile" />
            </section>
            <p onClick={() => bodyClick()}>
                {String(post.body).split("\n").map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </p>
        </section>
        <span className="info" onClick={() => bodyClick()}>
            <span className='likes'>{post.likes} radiation</span>
            <span className='comments'>{String(commentCount)}</span>
        </span>
    </article>
}