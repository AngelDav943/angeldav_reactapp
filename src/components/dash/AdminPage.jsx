
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './admin.css'
import InviteTile from "../InviteTile";

import Dash_home from "./home";
import Dash_invites from "./invites";

export default function () {
    const { loaded, info, forceLogin, getData, setError } = useInfo();
    if (info == null) return forceLogin();
    
    if (info?.permissions.admin == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [invites, setInvites] = useState(null);

    async function fetchInvites() {
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'GET',
            headers: { "token": info?.token, "all": "true" },
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"] == undefined) setInvites(response)
    }

    async function toggleInvite(inviteID, inviteData) {
        var enabled = inviteData.enabled == 0 ? 1 : 0

        console.log("invID:", inviteID)
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'PATCH',
            headers: { "token": info?.token, "Content-Type": "application/json"},
            body: JSON.stringify({
                "inviteID": inviteID,
                "enabled": enabled
            })
        })

        console.log("HELOOOO",fetchedData)
        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        console.log("response",response)
        if (response["msg"]) setError(response["msg"])

        fetchInvites();
    }

    useEffect(() => { fetchInvites() }, [])

    return <article className="admin">
        <div className="table">
            {Object.keys(info?.permissions).map(key => (
                <article key={key}>
                    <span>{key}</span>
                    <span>{info?.permissions[key]}</span>
                </article>
            ))}
        </div>
            {invites && invites.map((item, index) => (
                <InviteTile key={index} info={item} clickText={item.enabled == 0 ? "Enable" : "Disable"} onClick={toggleInvite} />
            ))}
    </article>
}