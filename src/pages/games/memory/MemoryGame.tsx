import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import MemoryCard from '../../../components/games/MemoryCard';

import './memoryGame.css'
import { useInfo } from '../../../context/useInfo';

let selectedCardRef: null | React.MutableRefObject<any> = null;
let selectedCardState: null | [number, React.Dispatch<React.SetStateAction<number>>] = null;
let last: null | { card: number, ref: React.MutableRefObject<any>, state: [number, React.Dispatch<React.SetStateAction<number>>] } = null;

export default function () {
    const { info, addNotification, updateBalance } = useInfo();
    const [socketUrl, setSocketUrl] = useState(`wss://datatest.angelddcs.workers.dev/websockets/games/memory`);

    const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 10,
            reconnectInterval: (attemptNumber) => Math.min(10000, Math.pow(2, attemptNumber)),
            queryParams: {
                token: info?.token
            }
        });

    const [points, setPoints] = useState(0);
    const [fails, setFails] = useState(0);

    const [cards, setCards] = useState(0);

    function gameLogic(data: Record<any, any>) {
        if (data.cards != undefined) return setCards(data.cards)
        if (data.start == 1) {
            document.querySelectorAll('.keep').forEach(item => item.classList.remove('keep'))
            document.querySelectorAll('.show').forEach(item => item.classList.remove('show'))
            document.querySelectorAll('.loaded').forEach(item => item.classList.remove('loaded'))
        }

        if (data.points != undefined) setPoints(data.points)
        if (data.failures != undefined) setFails(data.failures)

        console.log(data)
        if (data.reward) {
            addNotification('/images/coin.png', 'Congrats!', `You've got ${data.reward} coins!`)
            updateBalance(info?.balance + data.reward)
        }

        if (data.card && selectedCardState && selectedCardRef) {
            const [cardState, setCardState] = selectedCardState;
            setCardState(data.card)

            if (last != undefined) {
                const [lastState, setLastState] = last.state
                const lastref = last.ref.current
                const currentref = selectedCardRef.current

                if (last.card == data.card) {
                    lastref.classList.remove('show')
                    currentref.classList.remove('show')
                    lastref.classList.add('keep')
                    currentref.classList.add('keep')

                    last = null;
                    selectedCardRef = null;
                    return
                }

                setTimeout(() => {
                    lastref.classList.remove('show')
                    currentref.classList.remove('show')
                    lastref.classList.remove('loaded')
                    currentref.classList.remove('loaded')

                    setLastState(0)
                    setCardState(0)
                }, 500)

                last = null;
                selectedCardRef = null;
                return;
            }

            last = {
                "card": data.card,
                "ref": selectedCardRef,
                "state": selectedCardState
            };
        }

    }

    async function cardHandle(position, cardRef, cardState: [number, React.Dispatch<React.SetStateAction<number>>]) {
        sendJsonMessage({
            "position": position,
        })
        selectedCardState = cardState;
        selectedCardRef = cardRef;
    }

    useEffect(() => {
        if (lastJsonMessage != null) gameLogic(lastJsonMessage)
    }, [lastMessage]);

    const connectionStatus = ['Connecting', 'Connected', 'Disconnecting', 'Disconnected', 'Uninstantiated'][readyState];

    return (
        <main className='GAME_memory'>
            <p>Game status: <b>{connectionStatus}</b></p>
            <p className="gameinfo">
                <span className='points'>Points: {points}</span>
                <span className='fails' >Fails: {fails}</span>
            </p>
            {cards != 0 ? <section className="cards">
                {Array.from(Array(cards).keys()).map(index => (
                    <MemoryCard key={index} onClick={(e, cardRef, cardState) => cardHandle(index, cardRef, cardState)} pair={0} />
                ))}
            </section> : <p>Connecting</p>}
        </main>
    );
}
