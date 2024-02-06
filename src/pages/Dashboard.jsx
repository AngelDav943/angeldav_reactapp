
import { useInfo } from "../context/useInfo"
import { useState } from 'react';

import './dashboard.css'

export default function () {
    const { info, forceLogin, getData } = useInfo();

    if (info == null) return forceLogin();

    return <main className="dashboard">
        <section>
            <article className="info">
                <p>Hello {info?.username}</p>
            </article>
        </section>
    </main>
}