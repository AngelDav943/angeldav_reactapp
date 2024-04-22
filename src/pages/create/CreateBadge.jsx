import { useState } from 'react';
import './badge.css'
import { useInfo } from '../../context/useInfo';

export default function () {
    const { info, forceLogin, fetchWeb, setError } = useInfo();
    if (info == null) return forceLogin();

    if (info?.permissions.admin == 0) return <center className="loading">
        <img src="/images/monitor/monitor_red.png" alt="monitor" />
        <span>You don't have enough permissions to access this page.</span>
    </center>

    // const [badgeImage, setBadgeImage] = useState("");
    // const [badgeName, setBadgeName] = useState("");
    // const [badgeDescription, setBadgeDescription] = useState("");

    const [badgeData, setBadgeData] = useState({
        "image": "",
        "name": "",
        "description": ""
    })

    const createBadge = async () => {

        const response = await fetchWeb('/badges', {
            method: 'POST',
            data: badgeData
        })

        console.log("sent data:",badgeData)
        console.log("response:", response)
        if (response["msg"] != null) return setError("The given image is too large")
        // getData();
    }

    const uploadProfile = async () => {
        const files = document.getElementById("uploadImage").files;
        if (files == null || files[0] == null) return;

        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = reader.result;

            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = "64";
                canvas.height = "64";

                var ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, 64, 64);

                const dataURL = canvas.toDataURL("image/png");

                // max length should be 5000?
                console.log("from", reader.result.length, "to", dataURL.length)

                setBadgeData({...badgeData, "image": dataURL})
            }
        }
        reader.readAsDataURL(files[0]);
    }

    return <main className="test basic">
        <h2>Basic badge creation page</h2>
        <img src={badgeData["image"]} alt="preview image" />
        <p>{badgeData["name"]}</p>
        <p>{badgeData["description"]}</p>
        <hr />
        <label>
            Badge image
            <input type="file" id="uploadImage" onChange={(e) => uploadProfile(e)} />
        </label>
        <label>
            Display name
            <input placeholder="Badge's name" value={badgeData["name"]} onChange={(e) => { setBadgeData({...badgeData, "name": e.target.value}) }} />
        </label>

        <label>
            Description
            <textarea name="" id="" cols="30" defaultValue={badgeData["description"]} onChange={(e) => { setBadgeData({...badgeData, "description": e.target.value}) }} />
        </label>

        <input type="submit" value="Upload" onClick={() => createBadge()} />
    </main>
}