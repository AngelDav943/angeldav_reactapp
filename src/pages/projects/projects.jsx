import { Link } from 'react-router-dom'
import './projects.css'

export default function () {

    return <main className="projects basic">
        <section>
            <h2>Projects</h2>
        </section>
        
        <section className="item">
            <img src="/images/pocketwatch_wireframe.png" alt="pocketwatch model" />
            <article className="info">
                <Link className="label" to="">
                    <h2>3D Designs</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
        <section className="item right">
            <article className="info">
                <Link className="label" to="">
                    <h2>2D Designs</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <img src="/images/spongey.png" alt="Spongey" />
        </section>
        <section className="item">
            <img src="/images/drawn_computer.png" alt="placeholder" />
            <article className="info">
                <Link className="label" to="">
                    <h2>Games</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
        <section className="item right">
            <article className="info">
                <Link className="label" to="">
                    <h2>Apps</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <img src="/images/favicons/posts.ico" aria-label='placeholder' alt="placeholder"/>
        </section>
        <br />
        {/* <section className="item white">
            <video poster="" preload='true' autoPlay muted playsInline loop>
                <source src="/videos/turret.mp4" type="video/mp4" />
            </video>
            <article className="info">
                <Link className="label" to="">
                    <h2>Label</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section> */}
    </main>
}