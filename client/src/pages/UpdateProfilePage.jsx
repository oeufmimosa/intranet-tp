
import { useParams } from "react-router";
import UpdateCollaborator from "../components/updateCollaborator/UpdateCollaborator";

const updateProfilePage = () => {

    // On récupère l'id depuis la route qu'on transmet au composant enfant.
    const {id} = useParams();

    return (
        <UpdateCollaborator id={id}/>
    )
}

export default updateProfilePage;