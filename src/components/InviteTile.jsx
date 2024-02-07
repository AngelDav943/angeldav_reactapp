import './inviteTile.css'

export default function({ info, onClick }) {

    const leadingClick = function() {
        if (onClick != undefined) onClick(info.id)
    }

    return <div className="invite">
        <span>{info.invite}</span>
        <button onClick={leadingClick}>X</button>
    </div>
}