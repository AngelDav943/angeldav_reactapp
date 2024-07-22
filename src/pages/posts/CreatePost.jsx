
import { Link, useNavigate } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './createpost.css'
import Post from "../../components/post";

import utils from "../../utils";

export default function () {
    const { info, setError, setModal } = useInfo();
    const navigate = useNavigate();

    if (info?.permissions.post == 0) return <center className="loading noicon">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/posts', {
            method: 'POST',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify({ "body": body })
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        if (response["msg"]) return setError(response["msg"]);
        navigate('/posts');
    }

    /*const onPasteBody = async e => {
        e.preventDefault();
        var dataTransfer = e;
        const currentTarget = e.currentTarget;

        if (e["dataTransfer"]) dataTransfer = e["dataTransfer"]
        if (e["clipboardData"]) dataTransfer = e["clipboardData"]

        const files = dataTransfer.files;
        var bodyResult;

        if (files.length > 0) {
            var count = files.length;
            console.log("File Count: " + count + "\n");
            console.log(files[0])

            var reader = new FileReader();
            reader.onload = function (e) {
                var image = new Image();
                image.src = reader.result;

                image.onload = function () {
                    var canvas = document.createElement("canvas");
                    const aspect_ratio = image.height / image.width;

                    const new_width = 128 / aspect_ratio

                    canvas.width = String(new_width);
                    canvas.height = String(128);

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    const dataURI = canvas.toDataURL("image/jpeg");

                    // max length should be 5000
                    console.log("from", reader.result.length, "to", dataURI.length)

                    currentTarget.innerHTML += `<img src="${dataURI}"/>`
                }
            }
            reader.readAsDataURL(files[0])
            return
        }

        console.log(dataTransfer)
    }*/

    return <main className="createpost">
        <div className="editor">
            <form onSubmit={handleSubmit}>
                <br />
                <Post
                    post={{
                        commentCount: 0,
                        body: body,
                        timestamp: Date.now(),
                        user: info,
                        fromID: info?.id,
                        likes: []
                    }}
                    clickable={false}
                />
                <section id="inputs">
                    <textarea name="" id="" cols="30" onChange={(e) => { setBody(e.target.value) }} />
                    <br />
                    <div className="row">
                        <input type="submit" value="Submit" />
                        <Link className="button" to={'/posts/60'}>?</Link>
                    </div>
                </section>
            </form>
        </div>
    </main>
}