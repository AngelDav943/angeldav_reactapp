import React from 'react'
import { Link } from 'react-router-dom'

import './projects_games.css'
import ScrollerButtons from '../../components/ScrollerButtons'
import Bouncy from '../../components/Bouncy'

export default function () {

    const scrollerItems = {
        "Typing": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/unity_typingtest.mp4" type="video/mp4" />
                </video>
            </section>
        ),
        "Button": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/unity_buttontest.mp4" type="video/mp4" />
                </video>
            </section>
        ),
        "Item": (
            <section className="item white">
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/unity_itemgrabtest.mp4" type="video/mp4" />
                </video>
            </section>
        )
    }

    return <main className='projects games basic center'>
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
