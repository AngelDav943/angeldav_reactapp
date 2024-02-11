import { useEffect, useState } from "react";
import { useInfo } from "../../context/useInfo";

import './avatarcreator.css'

const avatarLink = "https://angeldav943.github.io/static/assets/images/avatar/"

export default function () {
    const { info, getData, setError } = useInfo();

    const [avatarImage, setAvatar] = useState("");

    const [hatData, setHatData] = useState(null);
    const [hatsLimits, setHatLimits] = useState(null);

    const [selectedHats, setSelected] = useState({});

    const [zoomVal, setZoom] = useState(1);
    const [offset, setOffset] = useState([0, 0]);

    const getHatData = async function () {
        const hatData = await fetch(avatarLink + 'hats.json');
        const limitsData = await fetch(avatarLink + 'hatlimits.json');

        const hatJSON = await hatData.json();
        const limitsJSON = await limitsData.json();

        setHatData(hatJSON);
        setHatLimits(limitsJSON);
    }

    const updateProfile = async () => {
        const width = 64, height = 64;

        var canvas = document.createElement("canvas");
        canvas.width = String(width);
        canvas.height = String(height);

        var context = canvas.getContext("2d");

        console.log(zoomVal)
        function loadImage(imageURL) {
            return new Promise(resolve => {
                const newImage = new Image();
                newImage.src = imageURL;
                newImage.crossOrigin = "*"

                newImage.onload = function () {
                    var pos_x = parseInt(offset[0]) + ((width / 2) - ((width * zoomVal) / 2));
                    var pos_y = parseInt(offset[1]) + ((height / 2) - ((height * zoomVal) / 2));

                    context.drawImage(newImage, pos_x, pos_y, width * zoomVal, height * zoomVal)
                    resolve(newImage);
                }
            })
        }

        const headIMG = await loadImage(avatarLink + "/head.png");

        if (selectedHats) {
            const imagePromises = [];
            const sortedHats = Object.keys(selectedHats);
            sortedHats.sort((a, b) => {
                const elementA = selectedHats[a]
                const elementB = selectedHats[b]
                return elementA.priority - elementB.priority;
            })

            sortedHats.map(name => {
                imagePromises.push(new Promise(async resolve => {
                    const element = selectedHats[name]
                    const elementImage = await loadImage(avatarLink + element.url);
                    resolve();
                }))
            })

            await Promise.all(imagePromises)
        }

        const dataURL = canvas.toDataURL("image/jpeg")
        setAvatar(dataURL)
        console.log("avatar image size:", dataURL.length)

    }

    useEffect(() => { getHatData(); }, [])
    useEffect(() => { updateProfile(); }, [[], [selectedHats], [zoomVal]])

    const saveData = async function () {
        var modifiedData = {}

        if (avatarImage != "") modifiedData["profile"] = avatarImage

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

        console.log(response)

        getData();
    }

    function itemClick(item) {
        if (Object.keys(selectedHats).indexOf(item.name) != -1) {
            var newSelected = { ...selectedHats }
            delete newSelected[item.name]
            setSelected(newSelected)
            return
        }

        var typeRepeat = 0
        Object.keys(selectedHats).map((name) => {
            if (selectedHats[name].type == item.type) typeRepeat++;
        })

        const itemLimits = hatsLimits[item.type]
        if (typeRepeat >= itemLimits.amount && itemLimits.limit == true) return

        var addSelected = { ...selectedHats }
        addSelected[String(item.name)] = item
        setSelected(addSelected);
        //updateProfile();
    }

    return <article className="avatarcreator">
        <div className="preview">
            <img id="preview" src={avatarImage} />
            <input type="submit" value="Save" onClick={() => saveData()} />
            <span>Zoom</span>
            <input type="range" name="" id="" min={10} max={100} value={zoomVal*10} onChange={(e) => setZoom(e.target.value/10)} />
            <br />
            <span>Offset</span>
            <input type="range" name="" id="" min={1 - 64} max={64} value={offset[0]} onChange={(e) => setOffset([e.target.value, offset[1]])} />
            <input type="range" name="" id="" min={-64} max={64} value={offset[1]} onChange={(e) => setOffset([offset[0], e.target.value])} />

        </div>
        {(hatData && hatsLimits) ? <div className="hats">
            {hatData.map((item, index) => (
                <div key={index} className={"item " + (Object.keys(selectedHats).indexOf(item.name) != -1 ? "selected" : "")} onClick={() => itemClick(item)}>
                    <img src={avatarLink + item.url} alt="icon" />
                    <span>{item.name}</span>
                </div>
            ))}
        </div> : <center>
            <img src="loading_monitor.gif" alt="loading gif" height={64} />
        </center>}
    </article>
}