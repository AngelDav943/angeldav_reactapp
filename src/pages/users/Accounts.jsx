
import { Link } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

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
        <link rel="stylesheet" href="/styles/pages/users/accounts.css" />
        <div className="items">
            {users.map((user, index) => (
                <UserTile user={user} key={index} extra={`"${user.status}"`} />
            ))}
        </div>
    </main> : <center className='loading' />
}