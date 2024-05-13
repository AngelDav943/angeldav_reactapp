import { Link } from 'react-router-dom'
import './projects.css'

export default function () {

    return <main className="projects home basic">
        <section>
            <h2>Projects</h2>
        </section>

        <section className="item">
            <img src="/images/pocketwatch_wireframe.png" alt="pocketwatch model" />
            <article className="info">
                <Link className="label" to="./models">
                    <h2>3D Designs</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
        {/* <section className="item right">
            <article className="info">
                <Link className="label" to="./designs">
                    <h2>2D Designs</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <img src="/images/spongey.png" alt="Spongey" />
        </section> */}
        <section className="item">
            <img src="/images/drawn_computer.png" alt="placeholder" />
            <article className="info">
                <Link className="label" to="./games">
                    <h2>Games</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
        </section>
        {/* <section className="item right">
            <article className="info">
                <Link className="label" to="">
                    <h2>Apps</h2>
                </Link>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <img src="/images/favicons/posts.ico" aria-label='placeholder' alt="placeholder"/>
        </section> */}
    </main>
}