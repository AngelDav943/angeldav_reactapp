
import { Link, json } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './admin.css'
import InviteTile from "../InviteTile";
import Post from "../post";
import MinimalPost from "../MinimalPost";

export default function () {
    const { info, forceLogin, setError, setModal, fetchWeb } = useInfo();
    if (info == null) return forceLogin();

    if (info?.permissions.admin == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [currentUserID, setViewingUser] = useState(1)

    const [users, setUsers] = useState([]);

    const [dataLoaded, setLoadingData] = useState(false);
    const [posts, setPosts] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [invites, setInvites] = useState(null);

    async function fetchUsers() {
        var fetchedData = await fetchWeb('/users');
        if (fetchedData) setUsers(response)
    }

    async function fetchData() {
        setLoadingData(false)

        const fetched = {
            "perms": await fetch('https://datatest.angelddcs.workers.dev/permissions', {
                headers: { "token": info?.token, "id": currentUserID },
            }),
            "invites": await fetch('https://datatest.angelddcs.workers.dev/invites', {
                headers: { "token": info?.token, "all": "true", "id": currentUserID },
            }),
            "posts": await fetch(`https://datatest.angelddcs.workers.dev/posts?fromID=${currentUserID}`, {
                headers: { "token": info?.token},
            })
        }

        var jsonDATA = {}
        try {
            const keys = Object.keys(fetched)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const element = fetched[key];
                jsonDATA[key] = await element.json();
            }
        } catch (error) {
            jsonDATA = { msg: String(error) }
        }

        if (jsonDATA["msg"]) return setError(jsonDATA["msg"])
        for (const key in jsonDATA) {
            const element = jsonDATA[key];
            if (element["msg"]) return setError(element["msg"])
        }
    
        setPosts(jsonDATA["posts"]);
        setInvites(jsonDATA["invites"]);
        setPermissions(jsonDATA["perms"]);
        
        setLoadingData(true)
    }

    async function toggleInvite(inviteID, inviteData) {
        var enabled = inviteData.enabled == 0 ? 1 : 0

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/invites', {
            method: 'PATCH',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({
                "inviteID": inviteID,
                "enabled": enabled
            })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) return setError(response["msg"]);
        fetchData();
    }

    async function togglePermission(userID, permission) {
        const newstatus = permissions[permission] == 0 ? 1 : 0
        var bodyJSON = {
            "targetID": userID
        }
        bodyJSON[String(permission)] = newstatus
        console.log(bodyJSON)

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/permissions', {
            method: 'PATCH',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify(bodyJSON)
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        setModal(null);
        if (response["msg"]) return setError(response["msg"])
        fetchData();
    }

    async function removePost(postID) {

        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            method: 'DELETE',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({id: postID})
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        setModal(null);
        if (response["msg"]) return setError(response["msg"]);
        fetchData();
    }

    const openPermissionModal = function (permission) {
        const selectedUser = users.find(item => {
            return item.id == currentUserID
        })

        const newstatus = permissions[permission] == 0 ? 1 : 0

        setModal(<>
            <p>Are you sure you want to change {selectedUser.username}'s permission of '{permission}' to {newstatus}?</p>
            <div className="buttons">
                <input type="button" value="Cancel" onClick={() => setModal(null)} />
                <input type="submit" value="Confirm" onClick={() => togglePermission(currentUserID, permission)} />
            </div>
        </>)
    }

    const openPostDeletionModal = function (postIndex) {
        const post = posts[postIndex]

        setModal(<>
            <p>Are you sure you want to delete {post.user.username}'s post with the title of '{post.title}'?</p>
            <div className="buttons">
                <input type="button" value="Cancel" onClick={() => setModal(null)} />
                <input type="submit" value="Confirm" onClick={() => removePost(post.id)} />
            </div>
        </>)
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        fetchData();
    }, [currentUserID])

    return <article className="admin">

        <div className="users">
            <div className="items">
                {users.map((user, index) => (
                    <div key={index} className={"user " + (currentUserID == user.id ? "selected" : "")} onClick={() => {setLoadingData(false); setViewingUser(user.id)}}>
                        <img src={user.profile} alt="profile" height={64} />
                        <div className="info">
                            <span>{user.id}</span>
                            <span>{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {dataLoaded && permissions["userID"] == currentUserID ? <>

            <h3>Permissions</h3>
            <div className="permissions">
                {permissions && Object.keys(permissions).map(key => {
                    if (key != "userID") return <article key={key} onClick={() => openPermissionModal(key)}>
                        <span>{key}</span>
                        <span>{permissions[key]}</span>
                    </article>
                })}
            </div>
            <h3>Invites</h3>
            <div className="invites">
                {invites && invites.map((item, index) => (
                    <InviteTile key={index} info={item} clickText={item.enabled == 0 ? "Enable" : "Disable"} onClick={toggleInvite} />
                ))}
            </div>
            <h3>Posts</h3>
            <div className="posts">
                {posts && posts.map((post, index) => (
                    <MinimalPost key={index} post={post} extrabutton={<button onClick={() => openPostDeletionModal(index)}>Remove</button>}/>
                ))}
            </div>
        </> : <center>
            <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        </center>
        }
    </article>
}