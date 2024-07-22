
import { Link, useNavigate } from "react-router-dom"
import { useInfo } from "../../context/useInfo"
import { useEffect, useState } from 'react';

import './createpost.css'
import Post from "../../components/post";

import utils from "../../utils";

export default function () {
    const { info, forceLogin, setError, setModal } = useInfo();
    const navigate = useNavigate();
    if (info == null) return forceLogin();

    if (info?.permissions.post == 0) return <center className="loading noicon">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [cursorPosition, setCursorPosition] = useState(0);
    const [selectionCursor, setSelectionCursor] = useState(-1);

    const handleSubmit = async e => {
        e.preventDefault();
        var fetchedData = await fetch('https://apiweb.angeld.workers.dev/posts', {
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

    const updateCursor = e => {

        function updateCursorPosition(position) {
            const clampedPosition = Math.max(0, Math.min(2, e.target.innerHTML.length))
            // console.log(e.target.innerHTML.length)
            // if (e.target.childNodes == null || e.target.childNodes[0] == null || isNaN(position)) return

            const range = document.createRange();
            range.setStart(e.target.childNodes[0], clampedPosition);
            range.collapse(true);

            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }


        if (e.key && e.key.includes("Shift") && selectionCursor != -1) {
            setSelectionCursor(-1)
        }

        if (e.type == "click" || (e.code && e.code.includes("Arrow"))) {
            const currentPosition = utils.getCaretCharacterOffsetWithin(e.target);
            setCursorPosition(() => {
                updateCursorPosition(currentPosition)
                return currentPosition
            });
        }



        // console.log("node", e)
        // return
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
                        body: "",
                        timestamp: Date.now(),
                        user: info,
                        fromID: info?.id,
                        likes: []
                    }}
                    clickable={false}
                    postBody={
                        <p
                            style={{
                                outline: 'none',
                                minWidth: 10,
                            }}
                            contentEditable={true}
                            onClick={updateCursor}
                            onKeyUp={updateCursor}
                            onKeyDown={(e) => {
                                return
                                if (e.key.includes("Shift") && selectionCursor == -1) {
                                    console.log(e)
                                    const currentPosition = utils.getCaretCharacterOffsetWithin(e.target);
                                    setSelectionCursor(currentPosition)
                                    console.log("currPos:", currentPosition)
                                }
                            }}
                            onInput={(e) => {
                                if (e.nativeEvent == null) return;

                                const inputType = String(e.nativeEvent.inputType)
                                if (inputType.includes("deleteContent")) {
                                    console.log(e.nativeEvent.inputType)

                                    let position = cursorPosition

                                    if (inputType.includes("Backward")) {
                                        position = cursorPosition - 1
                                    }

                                    setTitle(current => {
                                        let newCurrent = String(current).split("")
                                        newCurrent.splice(position, 1)
                                        console.log("test", newCurrent.join(""))
                                        return newCurrent.join('')
                                    })
                                    setCursorPosition(position)

                                    return
                                }

                                let data = e.nativeEvent.data
                                if (inputType.includes('insertParagraph')) {
                                    data = "\n"
                                }

                                if (data == null) return

                                let newTitle = title.split('')
                                newTitle.splice(cursorPosition, 0, data)
                                // console.log("new",newTitle)

                                setTitle(newTitle.join(''));
                                setCursorPosition(current => current + 1)
                            }}
                            dangerouslySetInnerHTML={{ __html: utils.parseMarkdown(title) }}
                            content="test"
                        />
                    }
                />
                {/* <section id="inputs">
                    <textarea name="" id="" cols="30" onChange={(e) => { setBody(e.target.value) }} />
                    <br />
                    <div className="row">
                        <input type="submit" value="Submit" />
                        <Link className="button" to={'/posts/60'}>?</Link>
                    </div>
                </section> */}
            </form>
        </div>
    </main>
}