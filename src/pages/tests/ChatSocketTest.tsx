import React, { useCallback, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useInfo } from '../../context/useInfo';
import MinimalPost from '../../components/MinimalPost';
import utils from '../../utils';

export default function () {
    const { info } = useInfo();
    const [socketUrl, setSocketUrl] = useState('ws://apiweb.angeld.workers.dev/websockets/tests/chat');
    const [messageHistory, setMessageHistory] = useState<any[]>([]);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
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
        if (lastJsonMessage != null) {
            console.log(lastJsonMessage)

            const html = document.querySelector("html")
            if (html) {
                if (html.scrollHeight - html.scrollTop < 850) html.scrollTop = html.scrollHeight
            }

            /*if (lastJsonMessage["type"] == 'message') */setMessageHistory((prev) => prev.concat(lastJsonMessage));
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
        <main className='TEST_chatsocket'>
            <link rel="stylesheet" href="/styles/pages/tests/chatSocketTest.css" />
            <code>This websocket test is highly unstable.</code>
            <code><h2>STATUS: {connectionStatus}</h2></code>
            <div className='messages'>
                {messageHistory.map((message, index) => {
                    if (message == null) return;

                    if (message.type == 'error') return <article key={index} className={`post minimal`}>
                        <span className='top'>
                            <span>Error</span>
                        </span>
                        <section className="body">
                            <div className="content">
                                {message.message}
                            </div>
                        </section>
                    </article>

                    if (message.user == null) return null

                    if (message.type == 'message') return <article key={index} className={`post minimal`}>
                        <span className='top'>
                            <div>
                                <span>@{message.user?.username || "Guest"}</span>
                            </div>
                            {utils.timeFromTimestamp(message.timestamp)}
                        </span>
                        <section className="body">
                            <section className="user">
                                <img src={message.user?.profile || ""} alt="profile" />
                            </section>
                            <div id='content'>
                                {message.message}
                            </div>
                        </section>
                    </article>

                    return null
                })}
            </div>
            <div className="inputbar">
                <input value={msg} onChange={({ target }) => setMsg(target.value)} />
                <button
                    onClick={handleClickSendMessage}
                    disabled={readyState !== ReadyState.OPEN}
                    type='submit'
                >
                    Send
                </button>
            </div>
            {/* {lastJsonMessage ? <p>Last message: {JSON.stringify(lastJsonMessage)}</p> : null} */}

        </main>
    );
}
