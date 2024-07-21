import React from 'react'
import './sectionParallax.css'

interface sectionProps {
    className: string
    children: React.JSX.Element
}

export default function SectionParallax({
    className = "",
    children
}: sectionProps) {
    return <section className={`parallax ${className}`}>
        {children}
    </section>
}
