import { useState, useEffect } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../style/card.css';

const List = () => {
    
    // Récupération des informations du reducer, state initial des collaborateurs et du chargement.
    const { userSession } = useSelector( state => state );
    const [collaborators, setCollaborators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Récupération de la liste des collaborateurs.
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

    // Fonction lancée au click pour supprimer un collaborateur/
    const onClickDeleteCollaborator = async (collaborator) => {

        // On demande à l'utilisateur de confirmer son action.
        const verify = window.confirm('Êtes-vous sûr de vouloir supprimer ce collaborateur ?');

        if(verify ===true)
        {
            // On vérifie que l'utilisateur courant ne se supprime pas lui-même;
            if(userSession[0].id == collaborator.id)
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
    
                // Une fois l'utilisateur supprimé, on renvoie la liste d'utilisateur filtré avec l'utilisateur supprimé en moins et on l'assigne au state courant.
                const deleteCollaboratorFilter = collaborators.filter((collab) => collab.id !== collaborator.id)
    
                setCollaborators(deleteCollaboratorFilter);

                // On affiche un message d'alerte comme quoi l'utilisateur a bien été supprimé.
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
            <div className="List-card">
                {!isLoading ? 
                        collaborators.map(( collaborator ) =>
                            <div key={collaborator.id} className="Card">
                                <Card collaborator={collaborator}/>
                                {/* Si l'utilisateur est l'admin on affiche les liens de modification et le bouton de suppression. */}
                                {userSession[0].isAdmin ?          
                                    <>
                                        <p><Link to={`/collaborateur/modifier/${collaborator.id}`}>Modifier</Link></p>
                                        <button onClick={() => onClickDeleteCollaborator(collaborator)}>Supprimer</button> 
                                    </>
                                : null}
                            </div>
                    ) : 
                        'Chargement'}
            </div>

        </>
    )
}

export default List;