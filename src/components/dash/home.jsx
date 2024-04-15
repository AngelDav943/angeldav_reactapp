import { useEffect, useState } from "react";
import { useInfo } from "../../context/useInfo";

import './home.css'

export default function () {
    const { info, getData, setError } = useInfo();

    const [bannerImage, setBanner] = useState(info?.banner || "none");
    const [profileImage, setProfile] = useState(info?.profile);

    const [profileDisplayName, setDisplayName] = useState(info?.displayname || "");
    const [profileStatus, setStatus] = useState(info?.status || "");

    const [darkmode, setDark] = useState(document.body.classList.contains("dark"));

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
        reader.readAsDataURL(files[0]);
    }

    const uploadBanner = async () => {
        const files = document.getElementById("uploadBanner").files;
        if (files == null || files[0] == null) return;

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

                setBanner(dataURI)
            }
        }
        reader.readAsDataURL(files[0]);
    }

    const saveData = async function () {
        var modifiedData = {}

        if (info?.profile != profileImage) modifiedData["profile"] = profileImage
        if (info?.banner != bannerImage) modifiedData["banner"] = bannerImage

        if (info?.displayname != profileDisplayName) modifiedData["displayname"] = profileDisplayName
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

        if (response["msg"] == "Given values are too long") return setError("The given image is too large")

        getData();
    }

    const changeMode = () => {
        document.body.classList.toggle("dark", !darkmode)
        localStorage.setItem("dark", !darkmode)
        setDark(!darkmode);
    }

    return <article className="dashhome">

        <section className="item">
            <div className="profilepreview">
                <div
                    className="banner"
                    style={{ backgroundImage: `url("${bannerImage}")` }}
                />
                <div className="top">
                    <img src={profileImage} alt="profile" />
                    <div className="info">
                        <span className="displayname">{info?.displayname}</span>
                        <span className="username">@{info?.username}</span>
                    </div>
                </div>
            </div>

            <div className="inputs">
                <label>
                    Username
                    <input placeholder={info?.username} disabled={true} />
                </label>
                <br />
                <label>
                    Display name
                    <input placeholder={info?.displayname} value={profileDisplayName} onChange={(e) => { setDisplayName(e.target.value) }} />
                </label>
                <br />
                <label>
                    Status
                    <textarea name="" id="" cols="30" defaultValue={profileStatus} onChange={(e) => { setStatus(e.target.value) }} />
                </label>
            </div>
        </section>

        <p>Profile </p>
        <input type="file" id="uploadImage" onChange={(e) => uploadProfile(e)} />

        <p>Banner</p>
        <input type="file" id="uploadBanner" onChange={(e) => uploadBanner(e)} />
        <br />

        <label>
            <input type="checkbox" checked={darkmode} onChange={() => changeMode()} />
            Dark mode
        </label>

        <br />

        <input type="submit" value="Save" onClick={() => saveData()} />
    </article>
}