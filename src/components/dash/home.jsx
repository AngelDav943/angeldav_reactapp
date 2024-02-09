import { useInfo } from "../../context/useInfo";

export default function() {
    const { info: user } = useInfo();

    return <center>
        <p>Hello {user?.username}</p>
    </center>
}