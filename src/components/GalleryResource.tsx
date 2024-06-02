import React, { useRef, useState } from 'react'
import './galleryResource.css'
import utils from '../utils';
import { Link } from 'react-router-dom';

import { useInfo } from '../context/useInfo';

export interface galleryResourceData {
    id: number;
    fromID: number;
    user: any;
    timestamp: number;
    image: string;
    type: string;
    public: boolean;
}

interface resourceProps {
    resource: galleryResourceData;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, data: { isPublic: boolean }) => void;
}

export function GalleryResource({ resource, onDelete = () => { }, onUpdate = () => { } }: resourceProps) {
    const { info, setModal } = useInfo();
    const cardRef = useRef<any>();
    const [isPublic, setPublic] = useState(resource.public)

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
        "image": <img src={resource.image} draggable={false} className='previewAsset' />,
        "video": <video className="previewAsset" src={resource.image} controls={true} />,
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
                <span className='small'>Published by <Link to={`/users/${resource.fromID}`}>@{resource.user.username}</Link></span>
                <span className='small'>{utils.timeFromTimestamp(resource.timestamp)}</span>
                <span><Link to={`/gallery/${resource.timestamp}0a${resource.id}`}>Preview</Link></span>
                {info && info?.id == resource.fromID && <>
                    <hr />
                    <div className="buttons">
                        <button type='submit' onClick={() => deleteButton()}>Delete</button>
                        <label>
                            <input type="checkbox" checked={isPublic} onChange={() => publicToggle()} />
                            public
                        </label>
                    </div>
                </>}
            </div>
        </div>
    )
}
