import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './websocketTest.css'

export default function () {
    const [socketUrl, setSocketUrl] = useState('wss://datatest.angelddcs.workers.dev/websockets/games/memory');
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const [position, setPosition] = useState(0);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    const handleClickSendMessage = useCallback(() => sendMessage(JSON.stringify({
        "position": position,
    })), [position]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <main className='TEST_websocket1'>
            <input type="number" value={position} onChange={({target}) => setPosition(parseInt(target.value))} />
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send position {position}
            </button>
            <p>The WebSocket is currently {connectionStatus}</p>
            {lastMessage ? <p>Last message: {lastMessage.data}</p> : null}
            <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul>
            
        </main>
    );
}
