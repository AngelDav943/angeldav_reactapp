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

        <section className="item right">
            <video poster="" preload='true' autoPlay muted playsInline loop>
                <source src="/videos/cone.mp4" type="video/mp4" />
            </video>
            <article className="info">
                <p>
                    I quite like creating projects to test around stuff, will be slowly 
                    adding more features to this website as time goes on.
                </p>
                <br />
                <div className="row">
                    <input type="button" value="Log in" />
                    <a className="submit" href='/signin' >Create account</a>
                </div>
            </article>
        </section>

        <section className="blueprint outlined">
            <div className="row">
                <img src="/images/turret_drawing.png" alt="turret sideways" />
                <img src="/images/turret_drawing_front.png" alt="turret front" />
            </div>
        </section>
    </main>
}