import React from 'react'
import Bouncy from '../components/Bouncy'
import { useLocation } from 'react-router-dom';

export default function (props) {
    const location = useLocation();
    return <>
        <center className='loading noicon notfound'>
            <img src="/images/monitor/monitor_red.png" alt="not found image" height={100} />
            <h1><Bouncy>Page not found</Bouncy></h1>
        </center>
        <span className="error">Page '{location.pathname}' not found</span>
    </>

}
