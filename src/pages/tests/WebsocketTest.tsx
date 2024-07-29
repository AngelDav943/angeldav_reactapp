import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useInfo } from '../../context/useInfo';

export default function () {
    const { info } = useInfo();
    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8787/websockets/tests');
    const [messageHistory, setMessageHistory] = useState<string[]>([]);

    const { sendJsonMessage, lastJsonMessage, lastMessage, readyState } = useWebSocket(
        socketUrl,
        {
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 10,
            reconnectInterval: (attemptNumber) => Math.min(10000, Math.pow(2, attemptNumber)),
            queryParams: {
                token: info?.token
            }
        });

    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory((prev) => prev.concat(JSON.stringify(lastJsonMessage)));
        }
    }, [lastJsonMessage]);

    const handleClickSendMessage = useCallback(() => sendJsonMessage({
        "message": msg,
    }), [msg]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <main className='TEST_websocket1'>
            <link rel="stylesheet" href="/styles/pages/tests/websocketTest.css" />
            <input value={msg} onChange={({ target }) => setMsg(target.value)} />
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send '{msg}'
            </button>
            <p>The WebSocket is currently {connectionStatus}</p>
            {lastMessage ? <p>Last message: {JSON.stringify(lastJsonMessage)}</p> : null}
            <ul>
                {messageHistory.map((message, index) => (
                    <code key={index}>{message ? message : null}</code>
                ))}
            </ul>

        </main>
    );
}
