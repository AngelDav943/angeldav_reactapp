import React, { useEffect, useState } from 'react'
import { useInfo } from '../../context/useInfo'
import { GalleryResource, galleryResourceData } from '../../components/GalleryResource';

import { Link } from 'react-router-dom';

export default function () {
    const { info, fetchWeb } = useInfo();

    const [loaded, setLoaded] = useState(false);
    const [resources, setResources] = useState<galleryResourceData[]>([]);

    async function fetchResources() {
        const response = await fetchWeb('/gallery');

        if (response["msg"] == undefined) {
            setLoaded(true)
            setResources(response)
        }
    }

    async function onResourceDelete(id) {

        const data = await fetchWeb('/gallery/remove', {
            method: 'DELETE',
            data: { id: id }
        })

        if (data) {
            let updatedList: galleryResourceData[] = [...resources]

            let resourceIndex: number = -1;
            updatedList.forEach((item, index) => {
                if (item.id == data.id) resourceIndex = index
            })

            if (resourceIndex != -1) {
                updatedList.splice(resourceIndex, 1)
                setResources(updatedList)
            }
        }
    }

    async function onResourceUpdate(id, updatedData) {

        const data = await fetchWeb('/gallery/update', {
            method: 'PATCH',
            data: { id: id, public: updatedData.isPublic }
        })

        if (data && updatedData.isPublic == false) {
            let updatedList: galleryResourceData[] = [...resources]

            let resourceIndex: number = -1;
            updatedList.forEach((item, index) => {
                if (item.id == data.id) resourceIndex = index
            })

            if (resourceIndex != -1) {
                updatedList.splice(resourceIndex, 1)
                setResources(updatedList)
            }
        }
    }

    useEffect(() => {
        fetchResources()
    }, [])

    if (loaded == false) return <center className='loading' />

    return <main className='gallerypage'>
        <link rel="stylesheet" href="/styles/pages/gallery/gallery.css" />
        <section>
            {info && (
                <Link to={'/gallery/vault'} className='vault'>
                    <div className="container">
                        <img src="/images/folder.png" />
                        <span>Open vault</span>
                    </div>
                </Link>
            )}
            <div className="cards">
                {resources.map((item: galleryResourceData) => (
                    <GalleryResource key={item.id} resource={item} onDelete={onResourceDelete} onUpdate={onResourceUpdate} isTile={true}/>
                ))}
            </div>
        </section>
    </main>
}
