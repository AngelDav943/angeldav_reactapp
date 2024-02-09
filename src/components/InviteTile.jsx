import './inviteTile.css'

export default function({ info, onClick }) {

    const leadingClick = function() {
        if (onClick != undefined) onClick(info.id)
    }

    return <div className={"invite "+ (info.enabled != 0 ? "enabled" : "") }>
        <span>{info.invite}</span>
        <span className='uses'>{info.uses}/{info.maxUses}</span>
        <button onClick={leadingClick}>X</button>
    </div>
}