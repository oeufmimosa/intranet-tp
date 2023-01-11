import { useState, useEffect } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const List = () => {

    const { userSession } = useSelector( state => state.collaboratorReducer );
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

    const onClickDeleteCollaborator = async (collaborator) => {

        const verify = window.confirm('Êtes-vous sûr de vouloir supprimer ce collaborateur ?');

        if(verify ===true)
        {
            if(userSession.userConnection.id == collaborator.id)
            {
                window.alert('Vous ne pouvez pas vous supprimer vous-même !');
            }
            else
            {
                const localToken = localStorage.getItem('token');
    
                const url = `http://localhost:9000/api/collaborateurs/${collaborator.id}`
    
                    
                const options = {
                    method:'DELETE',
                    body:JSON.stringify(collaborator),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localToken
                    }
                }
                const response = await fetch(url, options)
                const result = await response.json();
    
                const deleteCollaboratorFilter = collaborators.filter((collab) => collab.id !== collaborator.id)
    
                setCollaborators(deleteCollaboratorFilter);

                window.alert('Collaborateur supprimé !');
    
            }
        }
    }

    useEffect( ()=> {
        fetchCollaborators()
    }, [])

    return (
        <>
            <h3>Liste des collaborateurs</h3>
                {!isLoading ? 
                    collaborators.map(( collaborator ) =>
                        <>

                    <Card  key={collaborator.id} collaborator={collaborator}/>
                    {userSession.userConnection.isAdmin ?          
                        <>
                             <p><Link to={`/collaborateur/modifier/${collaborator.id}`}>Modifier</Link></p>
                            <button onClick={() => onClickDeleteCollaborator(collaborator)}>Supprimer</button> 
                        </>
                    : null}
                        
                        </>
                ) : 
                    'Chargement'}
        </>
    )
}

export default List;