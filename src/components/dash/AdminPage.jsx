
import { Link, json } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './admin.css'
import InviteTile from "../InviteTile";
import Post from "../post";
import MinimalPost from "../MinimalPost";
import utils from "../../utils";

export default function () {
    const { info, setError, setModal, fetchWeb } = useInfo();

    if (info?.permissions.admin == 0) return <center className="loading noicon">
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
        var data = await fetchWeb('/users');
        if (data) setUsers(data)
    }

    async function fetchData() {
        setLoadingData(false)

        const perms = await fetchWeb('/permissions', {
            headers: {"id": currentUserID },
        })
        const invites = await fetchWeb('/invites', {
            headers: { "all": "true", "id": currentUserID },
        })
        const posts = await fetchWeb(`/posts?fromID=${currentUserID}`)

        if (perms && invites && posts) {
            setPosts(posts)
            setInvites(invites)
            setPermissions(perms)
            setLoadingData(true)
        }
        
    }

    async function toggleInvite(inviteID, inviteData) {
        var enabled = inviteData.enabled == 0 ? 1 : 0

        var data = await fetchWeb('/invites', {
            method: 'PATCH',
            data: {
                "inviteID": inviteID,
                "enabled": enabled
            }
        })
        
        if (data) {
            let updatedInvites = [...invites]

            let inviteIndex = null;
            updatedInvites.forEach((inviteItem, index) => { 
                if (inviteItem.id == data.id) inviteIndex = index
            })
            
            if (inviteIndex != null) updatedInvites[inviteIndex] = data;
            setInvites(updatedInvites)
        }
    }

    async function togglePermission(userID, permission) {
        const newstatus = permissions[permission] == 0 ? 1 : 0
        var bodyJSON = {
            "targetID": userID
        }
        bodyJSON[String(permission)] = newstatus;

        var data = await fetchWeb('/permissions', {
            method: 'PATCH',
            data: bodyJSON
        })

        setModal(null);
        if (data) setPermissions(data)
    }

    async function removePost(postID) {

        var data = await fetchWeb('/posts', {
            method: 'DELETE',
            data: {id: postID}
        })

        setModal(null);
        if (data) {
            let updatedPosts = [...posts]

            let postIndex = null;
            updatedPosts.forEach((postItem, index) => { 
                if (postItem.id == data.id) postIndex = index
            })

            if (postIndex != null) updatedPosts.splice(postIndex, 1)
            setPosts(updatedPosts)
        }
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
            <p>Are you sure you want to delete {post.user.username}'s post made on the {utils.timeFromTimestamp(post.timestamp, true)}?</p>
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
            <article className="permissions">
                {permissions && Object.keys(permissions).map(key => {
                    if (key != "userID") return <article key={key} onClick={() => openPermissionModal(key)}>
                        <span>{key}</span>
                        <span>{permissions[key]}</span>
                    </article>
                })}
            </article>
            <h3>Invites</h3>
            <article className="invites">
                {invites && invites.map((item, index) => (
                    <InviteTile key={index} info={item} clickText={item.enabled == 0 ? "Enable" : "Disable"} onClick={toggleInvite} />
                ))}
            </article>
            <h3>Posts</h3>
            <article className="posts">
                {posts && posts.map((post, index) => (
                    <MinimalPost key={index} post={post} extrabutton={<button onClick={() => openPostDeletionModal(index)}>Remove</button>}/>
                ))}
            </article>
        </> : <center>
            <img src="/loading_monitor.gif" alt="loading gif" height={100} />
        </center>
        }
    </article>
}