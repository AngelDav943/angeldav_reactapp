import './inviteTile.css'

export default function({ info, onClick, clickText = "X", leading }) {

    const leadingClick = function() {
        if (onClick != undefined) onClick(info.id, info)
    }

    return <div className={"invite "+ (info.enabled != 0 ? "enabled" : "") }>
        {leading}
        <span>{info.invite}</span>
        <span className='uses'>{info.uses}/{info.maxUses}</span>
        <button onClick={leadingClick}>{clickText}</button>
    </div>
}