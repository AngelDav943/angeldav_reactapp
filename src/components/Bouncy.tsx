import React from 'react'
import './bouncy.css'

export default function (
    {
        children,
        delay = 0,
        looped = true,
        enabled = true
    }: {
        children: string,
        delay: number,
        looped: boolean,
        enabled: boolean
    }
) {
    return (
        <span className='bouncytext'>{
            String(children).split("").map((str, index) => (
                <span
                    key={index}
                    style={{
                        animationDelay: `${delay + -((String(children).length - index) / 5)}s`,
                        animationIterationCount: enabled ? (looped ? 'infinite' : 1) : 0,
                    }}
                >
                    {str}
                </span>
            ))
        }</span>
    )
}
