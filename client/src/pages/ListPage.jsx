import { useState, useEffect } from "react";
import Card from "../components/card/Card";

const ListPage = () => {

    const [collaborators, setCollaborators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCollaborators = async () => {

        const url = 'http://localhost:9000/api/collaborateurs'
        const localToken = localStorage.getItem('token');

        const options = {
            method:'get',
            headers: {
                'Authorization': localToken
            }
        }
        const response = await fetch(url, options)
        const results = await response.json();

        setCollaborators(results);
        setIsLoading(false);
    }

    useEffect( ()=> {
        fetchCollaborators()
    }, [])

    return (
        <>
            <h3>Liste des collaborateurs</h3>
                {!isLoading ? 
                    collaborators.map(( collaborator ) =>
                    <Card  key={collaborator.id} collaborator={collaborator}/>
                ) : 
                    'Chargement'}
        </>
    )
}

export default ListPage;