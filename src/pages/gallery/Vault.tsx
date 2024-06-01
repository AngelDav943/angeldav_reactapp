import React, { useEffect, useState } from 'react'
import { useInfo } from '../../context/useInfo'

export default function() {
    const { info, fetchWeb } = useInfo();
    const [resources, setResources] = useState([]);

    async function fetchResources() {
        const response = await fetchWeb('/gallery?personal=true');

        if (response["msg"] == undefined) {
            setResources(response)
            console.log(response)
        }
    }

    useEffect(() => {
        fetchResources()
    })

    return <main>
        <p>okay</p>
    </main>
}
