import { Link } from "react-router-dom";

const Card = ({ collaborator }) => {

    const {firstname, lastname, email, phone, city, country, photo, id} = collaborator
    
    return (
        <>
            <div>
                <img src={photo} alt="" />
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