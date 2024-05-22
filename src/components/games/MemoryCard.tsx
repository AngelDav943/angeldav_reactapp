import React, { useEffect, useId, useRef, useState } from 'react';

import './memoryCard.css'

interface cardProps {
    onClick: (event: any, cardRef: React.MutableRefObject<any>, pairState: [number, React.Dispatch<React.SetStateAction<number>>]) => void;
    pair: number;
}

export default function ({ onClick, pair = 0 }: cardProps) {
    const cardRef: React.MutableRefObject<any> = useRef();
    const [cardPair, setPair] = useState(pair);

    const handleOnClick = async function (event) {
        const current = cardRef.current
        if (current == null) return;
        if (current.classList.contains('keep') == true) return;

        if (onClick && current.classList.contains('show') == false) {
            await onClick(event, cardRef, [cardPair, setPair]);
            current.classList.add('show')
        }
    }

    useEffect(() => {
        if (cardRef.current && cardPair != 0) cardRef.current.classList.add('loaded')
    }, [cardPair])

    return <div ref={cardRef} className={`memoryCard`} onClick={handleOnClick}>
        <div className="face front">
            {cardPair != 0 && <img src={"/images/games/memory/" + cardPair + ".png"} alt="" />}
        </div>
        <div className="face back">
        </div>
    </div>
}