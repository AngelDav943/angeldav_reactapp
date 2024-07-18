import React, { Children, useEffect, useRef, useState } from 'react'
import { useInfo } from '../../context/useInfo'

import { Link, useNavigate, useParams } from 'react-router-dom';
import utils from '../../utils';

// import { Helmet } from 'react-helmet-async';

import './galleryPreview.css'
import { galleryResourceData } from '../../components/GalleryResource';
import VideoPlayer from '../../components/VideoPlayer';

export default function () {
    const { info, fetchWeb, setModal } = useInfo();
    const params = useParams();

    const navigate = useNavigate();

    const [isPublic, setPublic] = useState<boolean>(true);
    const [label, setLabel] = useState<string>("");

    const [loaded, setLoaded] = useState<boolean>(false);
    const [resource, setResource] = useState<galleryResourceData | null>(null);

    async function fetchResource() {
        let resourceID = params["ResourceID"] || ""
        const [targetTimestamp, targetID] = resourceID.split("0a").map(item => parseInt(item));
        if (isNaN(targetTimestamp) || isNaN(targetID)) return

        const resourceData = await fetchWeb(`/gallery?id=${targetID}`);
        if (resourceData) {
            setLoaded(true)
            setPublic(resourceData.public)
            setLabel(resourceData.label)
            setResource(resourceData)
        }
    }

    async function onDelete() {
        if (resource == null) return;

        const data = await fetchWeb('/gallery/remove', {
            method: 'DELETE',
            data: { id: resource.id }
        })

        if (data != null && data["success"] == true) navigate('/gallery')
    }

    async function deleteButton() {
        if (resource == null) return;
        setModal(<>
            <p>Are you sure you want to delete this image?</p>
            <div className="buttons">
                <input
                    type="button" value="Cancel"
                    onClick={() => setModal(null)}
                />
                <input
                    type="submit" value="Confirm"
                    onClick={() => {
                        setModal(null);
                        onDelete();
                    }}
                />
            </div>
        </>)
    }

    const inputRef = useRef<any>();
    async function labelButton() {
        if (resource == null) return;

        setModal(<>
            <p>Change resource label</p>
            <input ref={inputRef} type="text" placeholder="Label" defaultValue={label} />
            <div className="buttons">
                <input
                    type="button" value="Cancel"
                    onClick={() => setModal(null)}
                />
                <input
                    type="submit" value="Confirm"
                    onClick={() => {
                        if (inputRef.current == null) return;
                        setModal(null);
                        setLabel(inputRef.current.value);
                        onUpdate(resource.id, { label: inputRef.current.value });
                    }}
                />
            </div>
        </>)
    }

    async function onUpdate(id, updatedData) {
        const data = await fetchWeb('/gallery/update', {
            method: 'PATCH',
            data: { id: id, public: updatedData.isPublic, label: updatedData.label }
        })
    }

    function publicToggle() {
        if (resource == null) return;

        setPublic(current => {
            onUpdate(resource.id, { isPublic: !current })
            return !current
        })
    }

    useEffect(() => {
        fetchResource()
    }, [])

    if (loaded == false || resource == null) return <center className='loading' />

    const dataTypes = {
        "image": <img src={resource.data} draggable={false} className='previewAsset' />,
        "video": <VideoPlayer className='previewAsset' src={resource.data} controls={true} />,
    }

    return <main className='gallerypreview'>
        {/* <Helmet>
            <meta id="og-image" property="og:image" content={resource.data} />
            {(window.navigator.userAgent.includes("Discordbot") == true) && <meta http-equiv="refresh" content={`0; url=${resource.data}`} />}
        </Helmet> */}
        <section>
            <Link to={'/gallery'}>&lt; Go back</Link>
            <hr />
            {dataTypes[resource.type.split("/")[0]]}
            <div className="info">
                {label && <h2>"{label}"</h2>}
                <span className='small'>Published by <Link to={`/users/${resource.fromID}`}>@{resource.user.username}</Link></span>
                <span className='small'>{utils.timeFromTimestamp(resource.timestamp)}</span>
                <span>Type: {resource.type}</span>
                {info && info?.id == resource.fromID && <>
                    <hr />
                    <div className="buttons">
                        <button type='submit' onClick={() => deleteButton()}>Delete</button>
                        <button type='submit' onClick={() => labelButton()}>Change label</button>
                        <label>
                            <input type="checkbox" checked={isPublic} onChange={() => publicToggle()} />
                            public
                        </label>
                    </div>
                    <p>Currently: {isPublic ? 'public' : 'private'}</p>
                </>}
            </div>
        </section>
    </main>
}
