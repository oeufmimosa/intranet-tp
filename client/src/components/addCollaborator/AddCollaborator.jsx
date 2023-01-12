
import { useState } from "react";

import './../../style/form.css';

const AddCollaborator = () => {
    
    // State initial du collaborateur.
    const [collaborator, setCollaborator] = useState({
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
        isAdmin: false
    })

    // State pour la confirmation du mot de passe.
    const [confirmPassword, setConfirmPassword] = useState('');

    // Tableau d'objets de genres.
    const civilities = [
        {value: "female", text: "Femme"}, 
        {value: "male", text: "Homme"}, 
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

        // On stoppe le comportement par défaut du navigateur qui va rafraîchir la page..
        e.preventDefault();

        // On indique l'URL à interroger côté serveur et on récupère le token stocké dans le navigateur.
        const url = `http://localhost:9000/api/collaborateurs`;
        const localToken = localStorage.getItem('token');

        // On créé un objet d'options contenant les headers, la méthode, et l'objet à envoyer sur le serveur Node.js
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "POST",
            body: JSON.stringify(collaborator)
        }
        
        // Si la fonction checkForm renvoie true
        if(checkForm(collaborator) === true)
        {
            // On lance la requête asyncrhone avec la fonction fetch et avec les options. On récupère la réponse du serveur Node.js
            const response = await fetch(url, options)
            const result = await response.json();

            // Si la réponse contient une clé success on affiche le message, sinon on affiche le message d'erreur.
            if(result.success)
            {
                alert(result.success);
            }

            if(result.error)
            {
                alert(result.error);
            }
        }
    }

    // Fonction de vérification du formulaire.
    const checkForm = (user) => {
        
        // Si un des champs est vide...
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
            // On affiche une alerte et on retourne false.
            window.alert('Le mot de passe et sa confirmation sont différents');
            return false;
        }
        
        // Si l'email est invalide.
        if(emailIsValid(user.email) == false)
        {
            // On affiche une alerte et un retourne false.
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
    
    // Fonction utilisant les regex afin de vérifier si la chaîne de caractère correspond à un email. Elle renvoie un booléen.
    const emailIsValid = (email) => {
        return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    }

    // Pour chaque champ du formulaire à l'événement change, on met à jour le state et la clé correspondnate et on l'assigne au state.
    const handleInputChange = (event) => {
        
        const {value, name} = event.target

        const updatecollaborator = {
            ...collaborator,
            [name]: value
        }

        setCollaborator(updatecollaborator);
    }

    // On vérifie la checkbox admin.
    const checkButtonAdmin = (event) => {

        collaborator.isAdmin = event.target.checked;
    }

    return (
        <>
            <div className="login-box">
                <h3>Ajouter un collaborateur</h3>
                <form onSubmit={onSubmitForm} method="POST">
                    <div className="user-box">
                        <label htmlFor="gender">Genre: </label>
                        <select className="select" value={collaborator.gender} name="gender" onChange={handleInputChange}>
                            <option value=""></option>
                            {optionsCivilities}
                        </select>
                    </div>
                    <div className="user-box">
                    <label htmlFor="service">Service: </label>
                        <select className="select" value={collaborator.service} name="service" onChange={handleInputChange}>
                            <option value=""></option>
                            {optionsCategories}
                        </select>
                    </div>
                    <br />
                    <div className="user-box">
                        <input type="text" name="lastname"  value={collaborator.lastname} onChange={handleInputChange}/>    
                        <label htmlFor="lastname">Nom:</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="firstname"  value={collaborator.firstname} onChange={handleInputChange}/>
                        <label htmlFor="firstname">Prénom:</label>
                    </div>
                    <div className="user-box">
                        <input type="email" name="email"  value={collaborator.email} onChange={handleInputChange}/>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={collaborator.password} onChange={handleInputChange}/>
                        <label htmlFor="password">Mot de passe:</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <label htmlFor="confirmPassword">Confirmation:</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="phone" value={collaborator.phone} onChange={handleInputChange}/>
                        <label htmlFor="phone">Téléphone:</label>
                    </div>           
                    <div className="user-box">
                        <input type="date" name="birthdate" value={collaborator.birthdate} onChange={handleInputChange}/>
                        <label htmlFor="birthdate">Date de naissance:</label>
                    </div>                           
                    <div className="user-box">
                        <input type="text" name="city" value={collaborator.city} onChange={handleInputChange}/>
                        <label htmlFor="city">Ville:</label>
                    </div>                                          
                    <div className="user-box">
                        <input type="text" name="country" value={collaborator.country} onChange={handleInputChange}/>
                        <label htmlFor="country">Pays:</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="photo" value={collaborator.photo} onChange={handleInputChange}/>
                        <label htmlFor="photo">Photo:</label>
                    </div>
                    <div className="user-box">
                        <input type="checkbox" name="isAdmin" value={collaborator.isAdmin} onChange={checkButtonAdmin}/>
                        <label htmlFor="isAdmin">Administrateur ? :</label>
                    </div>
                    <input className="submitButton" type="submit" value="Ajouter" />
                </form>
            </div>
            
        </>
    )
}

export default AddCollaborator;