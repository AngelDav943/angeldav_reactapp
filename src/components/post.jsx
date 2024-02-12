import './post.css'

function timeFromTimestamp(timestamp, hidetime) {
    if (isNaN(parseInt(timestamp))) return "";

    const date = new Date(parseInt(timestamp));
    var time = {
        "day": date.getDate(),
        "month": date.getMonth() + 1,
        "year": date.getFullYear(),
        "hours": date.getHours(),
        "minutes": date.getMinutes()
    }

    for (var t in time) {
        if (time[t] < 10) time[t] = `0${time[t]}`
    }

    var timeStampCon = time.day + '/' + time.month + '/' + time.year;
    if (hidetime != true) timeStampCon += " " + time.hours + ':' + time.minutes

    return timeStampCon;
}

export default function ({ post }) {
    return <article className="post">
        <span className='date'>{timeFromTimestamp(post.timestamp)}</span>
        <section className="body">
            <section className="user">
                <img src={post.user.profile} alt="profile" />
                <div className="info">
                    <span className='username'>@{post.user.username}</span>
                    <span className='title'>{post.title}</span>
                </div>
            </section>
            <p>{String(post.body).split("\n").map((item, index) => (
                <span key={index}>{item}</span>
            ))}</p>
        </section>
    </article>
}
