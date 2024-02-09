
import { useInfo } from "../../context/useInfo";
import { useEffect, useState } from 'react';

import './invites.css'
import InviteTile from "../../components/InviteTile";

var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Headers": "Content-Type",
}

export default function () {
    const { loaded, info, forceLogin } = useInfo();
    if (info == null) return forceLogin();

    const [invites, setInvites] = useState(null);

    async function fetchInvites() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'GET',
            headers: { "token": info?.userID },
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) setInvites(response)
    }

    async function createInvite() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'POST',
            headers: { ...corsHeaders, "token": info?.userID },
        })
        fetchInvites()
    }

    async function removeInvite(inviteID) {
        console.log("inv id:", inviteID, "info:", info?.userID)
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify({ "id": inviteID, "token": info?.userID })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        console.log(response)
        fetchInvites()
    }

    useEffect(() => { fetchInvites() }, [])

    return <article className="invites">
        <div className="title">
            <span>Invites</span>
            <input type="submit" value="Create" onClick={createInvite} />
        </div>
        {invites && invites.map((item, index) => (
            <InviteTile key={index} info={item} onClick={removeInvite} />
        ))}
    </article>
}