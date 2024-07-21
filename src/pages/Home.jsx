import './home.css'
import { Link } from 'react-router-dom';

import Bouncy from '../components/Bouncy';
import ScrollerButtons from '../components/ScrollerButtons';

import SectionParallax from '../components/SectionParallax';

export default function Home() {

    const scrollerItems = {
        "Welcome": (
            <section className="item right white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/cone.mp4" type="video/mp4" />
                </video>
                <article className="info">
                    <p>
                        I like making projects and test around with stuff, will be slowly
                        adding more features to this website as time goes on.
                    </p>
                    <br />
                    <div className="row">
                        <Link to="/login" className='button'>Log in</Link>
                        <Link to='/signin' className="submit" >Create account</Link>
                    </div>
                    <br />
                </article>
            </section>
        ),
        "Projects": (
            <section className="item right gray">
                <article className="info">
                    <br />
                    <p>
                        Here I'll be posting some of the projects I've worked on.
                        (Still work in progress)
                    </p>
                    <br />
                    <div className="row">
                        <Link to='/projects' className="submit">Visit projects</Link>
                    </div>
                    <br />
                </article>
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/blankbook.mp4" type="video/mp4" />
                </video>
            </section>
        )
    }

    return <main className="home basic">
        <SectionParallax className='item gradient'>
            <article className="info" style={{ maxWidth: "400px" }}>
                <p>
                    Welcome to this website, made by <Bouncy>AngelDav943</Bouncy>.
                    <br />
                    I know lua, javascript, C#, some python, C++, dart (flutter) and some 3D modelling.
                </p>
            </article>
            <div
                className='overlapper'
                style={{
                    perspective: '1px',
                    perspectiveOrigin: 'right'
                }}
            >
                <img
                    src="/images/parallax/fg_city.png"
                    alt="city"
                    style={{
                        transform: 'translate3d(-100px, 0px, -0.5px) scale(3.5)'
                    }}
                />
                <img
                    src="/images/parallax/bg_city.png"
                    alt="city"
                    style={{
                        transform: 'translate3d(-90%, 250%, -10px) scale(30)'
                    }}
                />
            </div>
        </SectionParallax>
        <ScrollerButtons items={scrollerItems} />
        <section className="blueprint">
            <div className="row">
                <img src="/images/turret_drawing.png" alt="turret sideways" />
                <img src="/images/turret_drawing_front.png" alt="turret front" />
            </div>
        </section>
    </main >
}