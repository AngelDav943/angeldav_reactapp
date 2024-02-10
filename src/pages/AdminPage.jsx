
import { Link } from "react-router-dom"
import { useInfo } from "../context/useInfo"
import { useEffect, useState } from 'react';

import './admin.css'
import InviteTile from "../components/InviteTile";

import Dash_home from "../components/dash/home";
import Dash_invites from "../components/dash/invites";

export default function () {
    const { loaded, info, forceLogin, getData } = useInfo();
    if (info == null) return forceLogin();

    console.log(info?.permissions.admin)
    if (info?.permissions.admin == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    return <article className="admin">
        <div className="table">
            {Object.keys(info?.permissions).map(key => (
                <article key={key}>
                    <span>{key}</span>
                    <span>{info?.permissions[key]}</span>
                </article>
            ))}
        </div>
    </article>
}