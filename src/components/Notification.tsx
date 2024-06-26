import React from 'react';

import './notification.css'

export default function ({ iconImage, title, description }: { iconImage: string, title: string, description: string }) {
    return <article className='notification'>
        <img src={iconImage} alt="icon" draggable={false} />
        <div className="information">
            <span className="title">
                {title}
            </span>
            <span className="description">
                {description}
            </span>
        </div>
    </article>
}