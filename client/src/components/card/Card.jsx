import { Link } from "react-router-dom";

// Composant Card
const Card = ({ collaborator }) => {

    // On déstructure le paramètre collaborator et on récupère ses différentes propriétés.
    const {firstname, lastname, email, phone, city, country, photo, id, service, birthdate} = collaborator

    const date = new Date(birthdate)
    const localDate = date.toLocaleDateString()
    
    return (
        <>
            <div>
                <img style={{borderRadius:'100%'}}src={photo} alt={`${firstname}-${lastname}`} />
            </div>
            <div>
                <strong>{firstname} {lastname}</strong>
                <p>Email : {email}</p>
                <p>{city}, {country}</p>
                <p>Téléphone: {phone}</p>
                <p>Service: {service}</p>
                <p>Anniversaire: {localDate}</p>
                <p><Link to={`/collaborateur/${id}`}>Voir</Link></p>
            </div>
        </>
    )
}

export default Card;