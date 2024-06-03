import React, { useRef, useState } from 'react'
import './galleryResource.css'
import utils from '../utils';
import { Link } from 'react-router-dom';

import { useInfo } from '../context/useInfo';
import VideoPlayer from './VideoPlayer';

export interface galleryResourceData {
    id: number;
    fromID: number;
    user: any;
    timestamp: number;
    data: string;
    label: string;
    type: string;
    public: boolean;
}

interface resourceProps {
    resource: galleryResourceData;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, data: { isPublic?: boolean, label?: string }) => void;
}

export function GalleryResource({ resource, onDelete = () => { }, onUpdate = () => { } }: resourceProps) {
    const { info, setModal } = useInfo();
    const cardRef = useRef<any>();

    const [label, setLabel] = useState<string>(resource.label)
    const [isPublic, setPublic] = useState<boolean>(resource.public)

    function deleteButton() {
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
                        onDelete(resource.id)
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

    function publicToggle() {
        setPublic(current => {
            onUpdate(resource.id, { isPublic: !current })
            return !current
        })
    }

    function expandToggle() {
        if (cardRef.current == undefined) return;
        cardRef.current.classList.toggle('expand')
    }

    const dataTypes = {
        "image": <img src={resource.data} draggable={false} className='previewAsset' />,
        "video": <VideoPlayer className='previewAsset' src={resource.data} simpleControls={true} style={{width:'100%'}}/>,
    }

    function editModal() {
        setModal(<>
            <p>Edit resource</p>
            <div style={{width:"100%"}}>
                {dataTypes[resource.type.split("/")[0]]}
            </div>
            <hr />
            <label>
                <input type="checkbox" checked={isPublic} onChange={() => publicToggle()} />
                Public
            </label>
            <br />
            <button type='submit' onClick={() => deleteButton()}>Delete</button>
            <br />
            <button type='submit' onClick={() => labelButton()}>Edit label</button>
            <br />
        </>)
    }

    return (
        <div className='GalleryResourceCard' ref={cardRef}>
            <div className="top">
                <span>@{resource.user.username}</span>
                <span>{utils.timeFromTimestamp(resource.timestamp, true)}</span>
            </div>
            <div className="preview">
                {dataTypes[resource.type.split("/")[0]]}
                <img src="/images/info.png" className='config' draggable={false} onClick={() => expandToggle()} />
            </div>
            <div className="info">
                {resource.label && <span>"{resource.label}"</span>}
                <span className='small'>Published by <Link to={`/users/${resource.fromID}`}>@{resource.user.username}</Link></span>
                <span className='small'>{utils.timeFromTimestamp(resource.timestamp)}</span>
                <span><Link to={`/gallery/${resource.timestamp}0a${resource.id}`}>Preview</Link></span>
                {info && info?.id == resource.fromID && <>
                    <hr />
                    <div className="buttons">
                        <button type='submit' onClick={() => editModal()}>Edit</button>
                    </div>
                </>}
            </div>
        </div>
    )
}
