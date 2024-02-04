import './home.css'

export default function () {
    return <main className="home">
        <section className="item reverse">
            <img src="/images/city_pencil.png" alt="city" />
            <article className="info" style={{ maxWidth: "400px" }}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error pariatur nemo, et illum ipsam dolorum
                    iusto quis non quos, eaque quod necessitatibus ratione quo.
                </p>
            </article>
        </section>

        <section className="item">
            <video poster="" preload='true' autoPlay muted playsInline loop>
                <source src="/videos/cone.mp4" type="video/mp4" />
            </video>
            <article className="info">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error pariatur nemo, et illum ipsam dolorum
                    iusto quis non quos, at voluptatum quaerat laborum tenetur minus?
                </p>
                <br />
                <div className="row">
                    <input type="button" value="Something" />
                    <input type="submit" value="Something" />
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