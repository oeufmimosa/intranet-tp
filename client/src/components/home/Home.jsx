import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {

    // On créé un state pour un collaborateur aléatoire.
    const [randomCollaborator, setRandomCollaborator] = useState({
        id: '',
        gender: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        birthdate: "",
        city: "",
        country: "",
        photo: "",
        service: "",
        isAdmin: false
    })

    // On créé une fonction getRandomCollaborator qui va récupérer un collaborateur au hasard et l'assigner au state.
    const getRandomCollaborator = async () => {

        const url = 'http://localhost:9000/api/collaborateurs/random';

        const localToken = localStorage.getItem('token');

        const options = {
            headers: {
                'Authorization': localToken
            }
        }

        const response = await fetch(url, options);
        const random = await response.json();

        setRandomCollaborator(random)

    }

    const onClickRandom = () => {
        getRandomCollaborator()
    }

    // On lance la fonction au chargement du composant.
    useEffect( () => {
        getRandomCollaborator()
    }, [])
    
    const date = new Date(randomCollaborator.birthdate)
    const localDate = date.toLocaleDateString()

    return (
        <>
            <h4>Bienvenue sur l'Intranet</h4>
            <div>
                <p>La plate-forme qui vous permet de retrouver tous vos collaborateurs</p>
                <div>
                    <img src={randomCollaborator.photo} alt={randomCollaborator.photo} />
                </div>
                <div>
                    <p>{randomCollaborator.service}</p>
                    <p>{randomCollaborator.firstname} {randomCollaborator.lastname}</p>
                    <p>{randomCollaborator.country}</p>
                    <p><a href={`mailto:${randomCollaborator.email}`}>{randomCollaborator.email}</a></p>
                    <p><a href={`tel:${randomCollaborator.phone}`}>{randomCollaborator.phone}</a></p>
                    <p>Anniversaire : {localDate}</p>
                    <p><Link to={`/collaborateur/${randomCollaborator.id}`}>Consulter le profil de {randomCollaborator.firstname} {randomCollaborator.lastname}</Link></p>
                </div>
            </div>
            <button onClick={onClickRandom}>Dire bonjour à quelqu'un d'autre</button>
        </>
    )
}

export default Home;