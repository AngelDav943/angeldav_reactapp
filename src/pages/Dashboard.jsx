
import { useInfo } from "../context/useInfo"
import { useState } from 'react';

export default function () {
    const { info, forceLogin, getData } = useInfo();

    if (info == null) return forceLogin();

    return <main>
        <section>
            <article className="info">
                <p>Hello {info?.username}</p>
            </article>
        </section>
    </main>
}