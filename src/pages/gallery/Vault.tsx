import React, { useEffect, useRef, useState } from 'react'
import { useInfo } from '../../context/useInfo'
import { GalleryResource, galleryResourceData } from '../../components/GalleryResource';

import { Link } from 'react-router-dom';

import './gallery.css'
import './galleryVault.css'

export default function () {
    const { info, fetchWeb, setError } = useInfo();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [resources, setResources] = useState<galleryResourceData[]>([]);

    const uploadImageRef = useRef<any>();
    const checkboxPublicRef = useRef<any>();

    async function fetchResources() {
        const response = await fetchWeb('/gallery?personal=true');

        if (response != undefined && response["msg"] == undefined) {
            setLoaded(true)
            setResources(response)
        }
    }

    const [fileName, setFileName] = useState<string>("")
    const [blobData, setBlobData] = useState<Blob | null>(null)
    const [fileType, setFileType] = useState<string>("image/jpeg")
    const uploadResource = async () => {
        let publicState = 1;
        if (checkboxPublicRef.current != null) publicState = checkboxPublicRef.current.checked ? 1 : 0;

        const response = await fetchWeb('/gallery/create', {
            method: 'POST',
            headers: {
                'Content-Type': fileType,
                'public': publicState
            },
            data: blobData
        }, false)

        if (response) {
            fetchResources()
            setFileName("")
            setBlobData(null)
        }
    }

    const uploadFile = async () => {
        if (uploadImageRef.current == null) return;
        const files = uploadImageRef.current.files;
        if (files == null || files[0] == null) return;

        if (String(files[0].type).includes("image/gif")) {
            setBlobData(files[0])
            setFileName(files[0].name)
            setFileType(files[0].type)
            return;
        }


        var reader = new FileReader();
        reader.onload = function (e) {
            let image = new Image();
            image.src = reader.result as string;

            image.onload = function () {
                var canvas = document.createElement("canvas");
                const biggestSide = Math.max(image.height, image.width);
                const smallestSide = Math.min(image.height, image.width);

                const resizeFactor = Math.min(512, smallestSide, biggestSide / 2);

                if (biggestSide == image.height) {
                    const newSide = resizeFactor / (image.height / image.width); // resizeFactor / height factor
                    canvas.width = newSide;
                    canvas.height = resizeFactor;
                } else {
                    const newSide = resizeFactor / (image.width / image.height); // resizeFactor / width ratio
                    canvas.width = resizeFactor;
                    canvas.height = newSide;
                }


                let ctx = canvas.getContext("2d");
                ctx!.drawImage(image, 0, 0, canvas.width, canvas.height);

                const dataURL = canvas.toDataURL("image/png");

                canvas.toBlob(blob => {
                    if (blob == null) return;
                    setFileType("image/jpeg")
                    setBlobData(blob)
                    setFileName(files[0].name)
                }, "image/jpeg");


                // setPreview(dataURL)
            }
        }
        reader.readAsDataURL(files[0]);
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
    }

    useEffect(() => {
        fetchResources()
    }, [])

    if (loaded == false || resources == null) return <center className='loading'>
        <img src="/loading_monitor.gif" alt="loading gif" height={100} />
    </center>

    return <main className='gallerypage vault'>
        <section>
            <Link to={'/gallery'}>&lt; Go back</Link>
            <p>Here you can check all your uploaded images</p>
            <label className="upload">
                <div className="display">
                    <img src="/images/document.png" draggable={false} alt="" />
                    {fileName == "" ? <div className='multispan'>
                        <span>Drag and drop here</span>
                        <span className='small'>or click to upload</span>
                    </div> : <span>{fileName}</span>}
                </div>
                <input type="file" ref={uploadImageRef} onChange={() => uploadFile()} />
            </label>
            {blobData != null && (
                <div className="uploadNav">
                    <button onClick={() => { setBlobData(null); setFileName("") }}>Clear</button>
                    <label>
                        Public
                        <input type="checkbox" ref={checkboxPublicRef} defaultChecked />
                    </label>
                    <button type='submit' onClick={uploadResource}>Upload</button>
                </div>
            )}
            <div className="cards">
                {resources.map((item: galleryResourceData) => (
                    <GalleryResource key={item.id} resource={item} onDelete={onResourceDelete} onUpdate={onResourceUpdate} />
                ))}
            </div>
        </section>
    </main>
}
