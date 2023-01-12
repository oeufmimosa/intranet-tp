import Card from "../card/Card";
import { useState, useEffect } from "react";

const Collaborator = ( props ) => {

    // On récupère la propriété id dans props, on créé le state collaborator et isLoading auquel on assigne la valeur true.
    const {id} = props;
    const [collaborator, setCollaborator] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    
    // Fonction chargée de récupérer l'utilisateur en fonction de l'id.
    const fetchCollaborator = async () => {

        const url = `http://localhost:9000/api/collaborateurs/${id}`;
        const currentToken = localStorage.getItem('token');

        const options = {
            method: 'get',
            headers: {
                'Authorization': currentToken
            }
        }
        const response = await fetch(url, options);
        const result = await response.json();

        setCollaborator(result);
        setIsLoading(false);
    }


    // Utilisation du useEffect au chargement du composant.
    useEffect(() => {
        fetchCollaborator()
    }, [])

    return (
        <>
            {!isLoading ? <Card collaborator={collaborator}/> : 'Chargement'}
        </>
    )
}

export default Collaborator;