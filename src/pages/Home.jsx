import { useState, useEffect } from 'react'
import './home.css'
import { Link } from 'react-router-dom';

export default function () {

    const scrollerItems = {
        "Cone": (
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
                    </p>
                    <br />
                    <div className="row">
                        <Link to='/projects' className="submit" >Visit projects</Link>
                    </div>
                    <br />
                </article>
                <video poster="" preload='true' autoPlay muted playsInline loop>
                    <source src="/videos/blankbook.mp4" type="video/mp4" />
                </video>
            </section>
        )
    }

    const [currentView, setView] = useState(0);
    
    useEffect(() => {
        const scroller = document.querySelector(".scroller")
        if (scroller) {
            const amount = Object.keys(scrollerItems).length
            scroller.scrollLeft = (scroller.scrollWidth / amount) * Math.max(0, Math.min(currentView, amount))
        }
    }, [[currentView]])

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
        <div className="scroll_buttons">
            {Object.keys(scrollerItems).map((key, index) => (
                <button key={key} className={currentView == index ? "selected" : ""} onClick={() => setView(index)}>{key}</button>
            ))}
        </div>
        <div className='scroller'>
            {Object.keys(scrollerItems).map(key => (
                <div key={key} className='empty'>
                    {scrollerItems[key]}
                </div>
            ))}
        </div>

        <section className="blueprint">
            <div className="row">
                <img src="/images/turret_drawing.png" alt="turret sideways" />
                <img src="/images/turret_drawing_front.png" alt="turret front" />
            </div>
        </section>
    </main>
}