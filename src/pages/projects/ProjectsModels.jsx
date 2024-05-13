import React from 'react'
import { Link } from 'react-router-dom'

// import './projects_games.css'
import ScrollerButtons from '../../components/ScrollerButtons'
import Bouncy from '../../components/Bouncy'

export default function () {

    const scrollerItems = {
        "Device": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/device.mp4" type="video/mp4" />
                </video>
            </section>
        ),
        "Monitor": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/blender_monitoranimation.mp4" type="video/mp4" />
                </video>
            </section>
        ),
        "Turret": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/turret.mp4" type="video/mp4" />
                </video>
            </section>
        )
    }

    return <main className='projects models basic center'>
        <section className="item white">
            <article className='info'>
                <p>Still a</p>
                <h1>
                    <Bouncy>work in progress</Bouncy>
                </h1>
                <Link to='..'> &lt; Go back</Link>
            </article>
            <ScrollerButtons items={scrollerItems} reverse={true} />
        </section>
    </main>
}
