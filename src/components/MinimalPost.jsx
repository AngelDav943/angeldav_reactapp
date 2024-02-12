import './post.css'
import utils from '../utils'

export default function ({ post, extrabutton }) {
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
                <span className='title'>{post.title}</span>
            </p>
        </section>
    </article>
}