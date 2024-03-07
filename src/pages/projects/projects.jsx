import './projects.css'

export default function () {

    return <main className="projects basic">
        <section>
            <h2>Projects</h2>
        </section>
        
        <section className="item">
            <img src="/images/pocketwatch_wireframe.png" alt="pocketwatch model" style={{ maxWidth: "200px" }} />
            <article className="info">
                <a className="label" href="">
                    <h2>3D Designs</h2>
                </a>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
        <section className="item right">
            <article className="info">
                <a className="label" href="">
                    <h2>2D Designs</h2>
                </a>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <img src="/images/placeholder_logo.png" alt="PLACEHOLDER" style={{ maxWidth: "200px" }} />
        </section>
        <br />
        <section className="item white">
            <video poster="" preload='true' autoPlay muted playsInline loop>
                <source src="/videos/turret.mp4" type="video/mp4" />
            </video>
            <article className="info">
                <a className="label" href="">
                    <h2>Label</h2>
                </a>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
    </main>
}