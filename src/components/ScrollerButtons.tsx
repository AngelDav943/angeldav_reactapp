import React, { useEffect, useState } from 'react'
import './scrollerButtons.css'

export default function ({ items, startingPoint = 0 }: { items: object, startingPoint: number }) {
    const [currentView, setView] = useState(startingPoint);

    useEffect(() => {
        const scroller = document.querySelector(".scroller")
        if (scroller) {
            const amount = Object.keys(items).length
            scroller.scrollLeft = (scroller.scrollWidth / amount) * Math.max(0, Math.min(currentView, amount))
        }
    }, [[currentView]])

    return (
        <article className='scrollerButtons basicmain'>
            <div className="buttons">
                {Object.keys(items).map((key, index) => (
                    <button key={key} className={currentView == index ? "selected" : ""} onClick={() => setView(index)}>{key}</button>
                ))}
            </div>
            <div className='scroller'>
                {Object.keys(items).map(key => (
                    <div key={key} className='empty'>
                        {items[key]}
                    </div>
                ))}
            </div>
        </article>
    )
}
