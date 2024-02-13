import './post.css'
import utils from '../utils'

export default function ({ post, extrabutton }) {
    const comments = post.comments != null ? (isNaN(post.comments) ? post.comments.length : post.comments) : -1

    return <article className="post minimal">
        <span className='top'>
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
            <p>
                {String(post.body).split("\n").map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
                {comments != -1 && <span>{comments} comment{Math.abs(comments) > 1 || comments == 0 ? "s" : ""}</span>}
            </p>
        </section>
    </article>
}