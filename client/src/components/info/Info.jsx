import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import './../../style/form.css';

const Info = () => {
    const { userSession } = useSelector( state => state);

    // State initial du user.
    const [user, setUser] = useState({
        id: '',
        gender: '',
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        phone: '',
        birthdate: '',
        city: '',
        country: '',
        photo: '',
        service: '',
        isAdmin:userSession[0].isAdmin ? true : false
    })

    const [confirmPassword, setConfirmPassword] = useState('');

    // Tableau d'objets de genres.
    const civilities = [
        {value: "male", text: "Homme"}, 
        {value: "female", text: "Femme"}, 
      ]

    // Tableau d'objets de catégories.
    const categories = [
        {value:'Marketing', text:'Marketing'},
        {value:'Technique', text:'Technique'},
        {value:'Client', text:'Client'}
    ]

    // Fonction qui renvoie la liste des options de genres.
    const optionsCivilities = civilities.map((option, i) => {
        return <option key={i} value={option.value}>{option.text}</option>
    })
    
     // Fonction qui renvoie la liste des catégories.
    const optionsCategories = categories.map((option, i) => {
        return <option key={i} value={option.value}>{option.text}</option>
    })

    // Fonction pour la soumission du formulaire
    const onSubmitForm = async (e) => {
        e.preventDefault();

        const url = `http://localhost:9000/api/collaborateurs/${userSession[0].id}`;
        const localToken = localStorage.getItem('token');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "PUT",
            body: JSON.stringify(user)
        }

        // Si la fonction checkForm renvoie true
        if(checkForm(user) === true)
        {            
            const response = await fetch(url, options)
            const result = await response.json();
            
            // On lance la requête asyncrhone avec la fonction fetch et avec les options. On récupère la réponse du serveur Node.js
            if(result.success)
            {
                alert(result.success);
            }

             // Si la réponse contient une clé success on affiche le message, sinon on affiche le message d'erreur.
            if(result.error)
            {
                alert(result.error);
            }
        }

    }

    // Fonction de vérification du formulaire.
    const checkForm = (user) => {
        
        if(!user.gender ||
            user.firstname.trim().length === 0 ||
            user.lastname.trim().length === 0 ||
            user.email.trim().length === 0 ||
            // user.password.trim().length === 0 ||
            user.phone.trim().length === 0 ||
            user.birthdate.trim().length === 0 ||
            user.city.trim().length === 0 ||
            user.country.trim().length === 0 ||
            user.photo.trim().length === 0 ||
            !user.service)
        {
            // On affiche erreur et un retourne false.
            window.alert('Certains champs ne sont pas complétés');
            return false;
        }

        // Si le mot de passe entré et sa confirmation sont différents.
        if(user.password != confirmPassword)
        {
            window.alert('Le mot de passe et sa confirmation sont différents');
            return false;
        }

        // Si l'email est invalide.
        if(emailIsValid(user.email) ==false)
        {
            window.alert('Le format d\'email est incorrect');
            return false;
        }

        if(user.password.trim().length < 8)
        {
            alert('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }

        return true;
    }

    const emailIsValid = (email) =>
    {
        return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    }

     // Pour chaque champ du formulaire à l'événement change, on met à jour le state et la clé correspondnate et on l'assigne au state.
    const handleInputChange = (event) => {
        
        const {value, name} = event.target

        const updateUser = {
            ...user,
            [name]: value
        }

        setUser(updateUser);
    }

    // On récupère les informations de l'utilisateur courant.
    const fetchCurrentUser = async () => {

        const url = `http://localhost:9000/api/collaborateurs/${userSession[0].id}`;
        const localToken = localStorage.getItem('token');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "GET"
        }
        const response = await fetch(url, options)
        const result = await response.json();

        setUser(result);
    } 

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    return (
        <>
        <div className="login-box">
        <h3>Informations personnelles</h3>
            <form onSubmit={onSubmitForm} method="POST">
                <div className="user-box">
                    <label htmlFor="gender">Genre: </label>
                    <select  className="select" value={user.gender} name="gender" onChange={handleInputChange}>
                        <option value=""></option>
                        {optionsCivilities}
                    </select>
                </div>
                <div className="user-box">
                    <label htmlFor="service">Service: </label>
                    <select className="select" value={user.service} name="service" onChange={handleInputChange}>
                        <option value=""></option>
                        {optionsCategories}
                    </select>
                </div>
                <br />
                <div className="user-box">
                    <input type="text" name="lastname"  value={user.lastname} onChange={handleInputChange}/>
                    <label htmlFor="lastname">Nom:</label>
                </div>
                <div className="user-box">
                    <input type="text" name="firstname"  value={user.firstname} onChange={handleInputChange}/>
                    <label htmlFor="firstname">Prénom:</label>
                </div>
                <div className="user-box">
                    <input type="email" name="email"  value={user.email} onChange={handleInputChange}/>
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" value={user.password ? user.password : ''} onChange={handleInputChange}/>
                    <label htmlFor="password">Mot de passe:</label>
                </div>
                <div className="user-box">
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <label htmlFor="confirmPassword">Confirmation:</label>
                </div>
                <div className="user-box">
                    <input type="text" name="phone" value={user.phone} onChange={handleInputChange}/>
                    <label htmlFor="phone">Téléphone:</label>
                </div>           
                <div className="user-box">
                    <input type="date" name="birthdate" value={user.birthdate} onChange={handleInputChange}/>
                    <label htmlFor="birthdate">Date de naissance:</label>
                </div>                           
                <div className="user-box">
                    <input type="text" name="city" value={user.city} onChange={handleInputChange}/>
                    <label htmlFor="city">Ville:</label>
                </div>                                          
                <div className="user-box">
                    <input type="text" name="country" value={user.country} onChange={handleInputChange}/>
                    <label htmlFor="country">Pays:</label>
                </div>
                <div className="user-box">
                    <input type="text" name="photo" value={user.photo} onChange={handleInputChange}/>
                    <label htmlFor="photo">Photo:</label>
                </div>
                <input className="submitButton" type="submit" value="Modifier" />
            </form>
        </div>
           
        </>
    )
}

export default Info;