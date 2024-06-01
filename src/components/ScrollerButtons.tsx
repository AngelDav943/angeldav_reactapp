import React, { forwardRef, useEffect, useRef, useState } from 'react'
import './scrollerButtons.css'

interface props {
    items: Record<string, React.JSX.Element>,
    startingPoint: number,
    reverse: boolean
}

export default function ({ items, startingPoint = 0, reverse = false }: props) {
    const scrollRef: React.MutableRefObject<any> = useRef();
    const [currentView, setView] = useState(startingPoint);

    useEffect(() => {
        const scroller = scrollRef.current
        if (scroller) {
            const amount = Object.keys(items).length
            scroller.scrollLeft = (scroller.scrollWidth / amount) * Math.max(0, Math.min(currentView, amount))
        }
    }, [[currentView]])

    return (
        <article className={`scrollerButtons basicmain ${reverse ? 'reverse' : ''}`}>
            <div className="buttons">
                {Object.keys(items).map((key, index) => (
                    <button key={key} className={currentView == index ? "selected" : ""} onClick={() => setView(index)}>{key}</button>
                ))}
            </div>
            <div ref={scrollRef} className='scroller'>
                {Object.keys(items).map(key => (
                    <div key={key} className='empty'>
                        {items[key]}
                    </div>
                ))}
            </div>
        </article>
    )
}
