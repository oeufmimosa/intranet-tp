
import { useParams } from "react-router";
import UpdateCollaborator from "../components/updateCollaborator/UpdateCollaborator";

const updateProfilePage = () => {

    const {id} = useParams();

    return (
        <UpdateCollaborator id={id}/>
    )
}

export default updateProfilePage;