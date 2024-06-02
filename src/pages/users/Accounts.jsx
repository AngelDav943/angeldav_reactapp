
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './accounts.css'
import UserTile from "../../components/UserTile";

export default function () {
    const { fetchWeb } = useInfo();

    const [usersLoaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        const response = await fetchWeb('/users');

        if (response["msg"] == undefined) {
            setLoaded(true)
            setUsers(response)
        }
    }

    useEffect(() => { fetchUsers() }, [])

    return usersLoaded ? <main className="users">
        <div className="items">
            {users.map((user, index) => (
                <UserTile user={user} key={index} extra={`"${user.status}"`}/>
            ))}
        </div>
    </main> : <center className='loading' />
}