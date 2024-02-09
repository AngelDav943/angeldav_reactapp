import { useInfo } from "../../context/useInfo";

export default function() {
    const { info: user } = useInfo();

    return <p>Hello {user?.username}</p>
}