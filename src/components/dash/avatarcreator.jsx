import { useEffect, useState } from "react";
import { useInfo } from "../../context/useInfo";

import './avatarcreator.css'

const avatarLink = "https://angeldav943.github.io/static/assets/images/avatar/"

export default function () {
    const { info, getData } = useInfo();

    const [profileImage, setProfile] = useState(info?.profile);
    const [avatarImage, setAvatar] = useState();

    const [hatData, setHatData] = useState(null);
    const [hatsLimits, setHatLimits] = useState(null);

    const [selectedHats, setSelected] = useState({});

    const getHatData = async function () {
        const hatData = await fetch(avatarLink+'hats.json');
        const limitsData = await fetch(avatarLink+'hatlimits.json');

        const hatJSON = await hatData.json();
        const limitsJSON = await limitsData.json();

        setHatData(hatJSON);
        setHatLimits(limitsJSON);
    }
    
    const updateProfile = async () => {
        const width = 128, height = 128;
        
        var canvas = document.createElement("canvas");
        canvas.width = String(width);
        canvas.height = String(height);
        
        var context = canvas.getContext("2d");
        
        const headIMG = new Image();
        headIMG.src = avatarLink+"/head.png"
		context.drawImage(headIMG, 0, 0, width, height);

        if (selectedHats) {
            const sortedHats = Object.keys(selectedHats);
            sortedHats.sort((a, b) => {
                const elementA = selectedHats[a]
                const elementB = selectedHats[b]
                return elementA.priority - elementB.priority;
            })
    
            sortedHats.map(name => {
                const element = selectedHats[name]
                const elmentImage = new Image();
                elmentImage.src = avatarLink + element.url;
                context.drawImage(elmentImage, 0, 0, width, height);
            })
        }
        
        setAvatar(canvas.toDataURL())
    }
    
    useEffect(() => { getHatData();}, [])
    useEffect(() => { updateProfile();}, [[], [selectedHats]])
    
    const saveData = async function () {
        var modifiedData = {}

        if (info?.profile != profileImage) modifiedData["profile"] = profileImage

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

    function itemClick(item) {
        if (Object.keys(selectedHats).indexOf(item.name) != -1) {
            var newSelected = {...selectedHats}
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

        var addSelected = {...selectedHats }
        addSelected[String(item.name)] = item
        setSelected(addSelected);
        //updateProfile();
    }

    return <article className="avatarcreator">
        <img id="preview" src={avatarImage}/>
        {(hatData && hatsLimits) ? <div className="hats">
            {hatData.map((item,index) => (
                <div key={index} className={"item " + (Object.keys(selectedHats).indexOf(item.name) != -1 ? "selected" : "")} onClick={() => itemClick(item)}>
                    <img src={avatarLink+item.url} alt="icon" />
                    <span>{item.name}</span>
                </div>
            ))}
        </div> : <center>
            <img src="loading_monitor.gif" alt="loading gif" height={64} />
        </center>}
    </article>
}