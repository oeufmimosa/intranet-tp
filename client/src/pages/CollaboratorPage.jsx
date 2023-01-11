
import { useParams } from "react-router";
import Card from "../components/card/Card";
import { useState, useEffect } from "react";

const CollaboratorPage = () => {

    const { id } = useParams();

    const [collaborator, setCollaborator] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    
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


    useEffect(() => {
        fetchCollaborator()
    }, [])

    return (
        <>
            {!isLoading ? <Card collaborator={collaborator}/> : 'Chargement'}
        </>
    )
}

export default CollaboratorPage;