import React, { Children, useEffect, useState } from 'react'
import { useInfo } from '../../context/useInfo'

import { Link, useNavigate, useParams } from 'react-router-dom';
import utils from '../../utils';

import { Helmet } from 'react-helmet-async';

import './galleryPreview.css'
import { galleryResourceData } from '../../components/GalleryResource';

export default function () {
    const { info, fetchWeb, setError } = useInfo();
    const params = useParams();

    const navigate = useNavigate();

    const [isPublic, setPublic] = useState<boolean>(true);
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
            setResource(resourceData)
        }
        console.log(resourceData)
    }

    async function deleteButton() {
        if (resource == null) return;

        const data = await fetchWeb('/gallery/remove', {
            method: 'DELETE',
            data: { id: resource.id }
        })

        if (data != null && data["success"] == true) navigate('/gallery')
    }

    async function onUpdate(id, updatedData) {
        const data = await fetchWeb('/gallery/update', {
            method: 'PATCH',
            data: { id: id, public: updatedData.isPublic }
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

    if (loaded == false || resource == null) return <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>

    return <main className='gallerypreview'>
        <Helmet>
            <meta id="og-image" property="og:image" content={resource.image} />
        </Helmet>
        <section>
            <Link to={'/gallery'}>&lt; Go back</Link>
            <hr />
            <img src={resource.image} draggable={false} className='preview' />
            <div className="info">
                <span className='small'>Published by <Link to={`/users/${resource.fromID}`}>@{resource.user.username}</Link></span>
                <span className='small'>{utils.timeFromTimestamp(resource.timestamp)}</span>
                {info && info?.id == resource.fromID && <>
                    <hr />
                    <div className="buttons">
                        <button type='submit' onClick={() => deleteButton()}>Delete</button>
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
