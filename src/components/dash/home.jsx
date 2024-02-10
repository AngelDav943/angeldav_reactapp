import { useEffect, useState } from "react";
import { useInfo } from "../../context/useInfo";

import './home.css'

export default function () {
    const { info, getData } = useInfo();

    const [profileImage, setProfile] = useState(info?.profile);
    const [profileStatus, setStatus] = useState(info?.status || "");
    const [darkmode, setDark] = useState(document.body.classList.contains("dark"));

    const uploadProfile = async () => {
        const files = document.getElementById("uploadImage").files;
        if (files == null || files[0] == null) return;

        //if (files[0].type != "image/png" && files[0].type != "image/jpeg") return
        //console.log(files[0].type)

        var reader = new FileReader();
        var result = ""
        reader.onload = function (e) {
            var image = new Image();
            image.src = reader.result;

            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = "64";
                canvas.height = "64";

                var ctx = canvas.getContext("2d");

                var gradient = ctx.createLinearGradient(0, 0, 64, 64);
                gradient.addColorStop(0, "#ff8300");
                gradient.addColorStop(1, "orange");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 64, 64)

                ctx.drawImage(image, 0, 0, 64, 64);

                const dataURL = canvas.toDataURL("image/jpeg");

                // max length should be 5000
                console.log("from", reader.result.length, "to", dataURL.length)

                setProfile(dataURL)
            }
        }

        reader.readAsDataURL(files[0])
    }

    const saveData = async function () {
        var modifiedData = {}

        if (info?.profile != profileImage) modifiedData["profile"] = profileImage
        if (info?.status != profileStatus) modifiedData["status"] = profileStatus

        // TODO: send all data to API
        var fetchedData = await fetch('https://datatest.angelddcs.workers.dev/users', {
            method: 'PATCH',
            headers: { "token": info?.token, "Content-Type": "application/json" },
            body: JSON.stringify(modifiedData)
        })

        var response = await fetchedData.json().catch(err => {
            return { msg: String(err) }
        })

        getData();
    }

    const changeMode = () => {
        document.body.classList.toggle("dark", !darkmode)
        localStorage.setItem("dark", !darkmode)
        setDark(!darkmode);
    }

    return <article className="dashhome">
        <input type="file" id="uploadImage" onChange={(e) => uploadProfile(e)} />
        <br />

        <section className="item">
            <div className="profile">
                <img src={profileImage} alt="profile picture" height={75} />
                <span>@{info.username}</span>
            </div>
            <div className="inputs">
                <label>
                    Username
                    <input placeholder={info?.username} disabled={true} />
                </label>
                <br />
                <label>
                    Status
                    <textarea name="" id="" cols="30" defaultValue={profileStatus} onChange={(e) => { setStatus(e.target.value) }} />
                </label>
            </div>
        </section>

        <label>
            <input type="checkbox" checked={darkmode} onChange={() => changeMode()} />
            Dark mode
        </label>

        <br />

        <input type="submit" value="Save" onClick={() => saveData()} />
    </article>
}