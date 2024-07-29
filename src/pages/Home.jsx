
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
        <link rel="stylesheet" href="/styles/pages/home.css" />
        <SectionParallax className='item gradient overlapper'>
            <div className="overlapper" style={{
                justifyContent: 'center',
                alignItems: 'start',
                paddingTop: '7rem',
                flexGrow: 1
            }}>
                <article
                    className="info"
                    style={{
                        maxWidth: '90vw',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        margin: 'auto',
                        marginTop: '-4rem'
                    }}
                >
                    <center>
                        <p>Welcome to this website, made by <Bouncy>AngelDav943</Bouncy>.</p>
                    </center>
                </article>
                <div
                    className='overlapper'
                    style={{
                        height: '60vh',
                        width: '100vw',
                        perspective: '10px',
                        perspectiveOrigin: 'right',
                        justifyItems: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className='overlapper'
                        style={{
                            width: '100%',
                            justifyItems: 'start'
                        }}
                    >
                        <img
                            src="/images/parallax/foreground_right_city.png"
                            alt="city"
                            style={{
                                transformOrigin: 'bottom',
                                width: '350px',
                                maxWidth: 'none',
                                position: 'absolute',
                                transform: 'translate3d(-100%, 15vh, -0.5px) scale(1.8)'
                            }}
                        />
                    </div>
                    <div
                        className='overlapper'
                        style={{
                            width: '100%',
                            justifyItems: 'end'
                        }}
                    >
                        <img
                            src="/images/parallax/foreground_left_city.png"
                            alt="city"
                            style={{
                                transformOrigin: 'bottom',
                                width: '250px',
                                maxWidth: 'none',
                                position: 'absolute',
                                transform: 'translate3d(100%, 15vh, -0.5px) scale(1.8)'
                            }}
                        />
                    </div>
                    <img
                        src="/images/parallax/middleground_city.png"
                        alt="city"
                        style={{
                            transformOrigin: 'top',
                            transform: 'translate3d(0%, 50%, -1px) scale(5)'
                        }}
                    />
                    <img
                        src="/images/parallax/bg_city.png"
                        alt="city"
                        style={{
                            transform: 'translate3d(0%, 80%, -3px) scale(8)'
                        }}
                    />
                </div>
            </div>
        </SectionParallax>
        <section className='primary'>
            <article className="info">
                <p>
                    I know lua, javascript, C#, some python, C++, dart (flutter) and some 3D modelling.
                </p>
            </article>
        </section>
        <ScrollerButtons items={scrollerItems} />
        <section className="blueprint">
            <div className="row">
                <img src="/images/turret_drawing.png" alt="turret sideways" />
                <img src="/images/turret_drawing_front.png" alt="turret front" />
            </div>
        </section>
    </main >
}