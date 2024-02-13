import './home.css'

export default function () {
    return <main className="home basic">
        <section className="item reverse">
            <img src="/images/city_pencil.png" alt="city" />
            <article className="info" style={{ maxWidth: "400px" }}>
                <p>
                    Welcome to this website, made by AngelDav943. <br />
                    I know lua, javascript, C#, some python, a bit of dart and some 3D modelling.
                </p>
            </article>
        </section>
        <br />
        <section className="item right white">
            <video poster="" preload='true' autoPlay muted playsInline loop>
                <source src="/videos/cone.mp4" type="video/mp4" />
            </video>
            <article className="info">
                <p>
                    I quite like making projects and test around with stuff, will be slowly
                    adding more features to this website as time goes on.
                </p>
                <br />
                <div className="row">
                    <a href="/login" className='button'>Log in</a>
                    <a href='/signin' className="submit" >Create account</a>
                </div>
                <br />
            </article>
        </section>

        <section className="blueprint">
            <div className="row">
                <img src="/images/turret_drawing.png" alt="turret sideways" />
                <img src="/images/turret_drawing_front.png" alt="turret front" />
            </div>
        </section>
    </main>
}