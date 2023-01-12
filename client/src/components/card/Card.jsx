import { Link } from "react-router-dom";

// Composant Card
const Card = ({ collaborator }) => {

    // On déstructure le paramètre collaborator et on récupère ses différentes propriétés.
    const {firstname, lastname, email, phone, city, country, photo, id} = collaborator
    
    return (
        <>
            <div>
                <img src={photo} alt={`${firstname}-${lastname}`} />
            </div>
            <div>
                <p>{firstname} {lastname}</p>
                <p>Email : {email}</p>
                <p>{city}, {country}</p>
                <p>Téléphone: {phone}</p>
                <p><Link to={`/collaborateur/${id}`}>Voir</Link></p>
            </div>
        </>
    )
}

export default Card;