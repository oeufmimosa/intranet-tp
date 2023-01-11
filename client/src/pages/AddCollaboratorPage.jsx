import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

const AddCollaboratorPage = () => {

    const [civility, setCivility] = useState('female')
    const [category, setCategory] = useState('Marketing')

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

    const civilities = [
        {value: "female", text: "Femme"}, 
        {value: "male", text: "Homme"}, 
      ]

    const categories = [
        {value:'Marketing', text:'Marketing'},
        {value:'Technique', text:'Technique'},
        {value:'Client', text:'Client'}
    ]

    const optionsCivilities = civilities.map((option, i) => {

        return <option key={i} value={option.value}>{option.text}</option>
    })

    
    const optionsCategories = categories.map((option, i) => {
        return <option key={i} value={option.value}>{option.text}</option>
    })

    const onSubmitForm = async (e) => {
        e.preventDefault();
        collaborator.gender = civility;
        collaborator.service = category;

        console.log(collaborator);

        const url = `http://localhost:9000/api/collaborateurs`;
        const localToken = localStorage.getItem('token');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "POST",
            body: JSON.stringify(collaborator)
        }
        
        if(checkForm(collaborator) === true)
        {
            const response = await fetch(url, options)
            const result = await response.json();
        }
    }

    const checkForm = (user) => {
        
        if(!user.gender ||
            user.firstname.trim().length === 0 ||
            user.lastname.trim().length === 0 ||
            user.email.trim().length === 0 ||
            user.password.trim().length === 0 ||
            user.phone.trim().length === 0 ||
            user.birthdate.trim().length === 0 ||
            user.city.trim().length === 0 ||
            user.country.trim().length === 0 ||
            user.photo.trim().length === 0 ||
            !user.service)
        {
            console.log(user);
            
            window.alert('Certains champs ne sont pas complétés');
            return false;
        }

        return true;
    }

    const handleInputChange = (event) => {
        
        const {value, name} = event.target

        const updatecollaborator = {
            ...collaborator,
            [name]: value
        }

        console.log(value);

        setCollaborator(updatecollaborator);
    }

    const checkButtonAdmin = (event) => {

        collaborator.isAdmin = event.target.checked;
    }

    return (
        <>
            <h3>Ajouter un collaborateur</h3>
            <form onSubmit={onSubmitForm} method="POST">
                <select value={civility} name="gender" onChange={(e) => setCivility(e.target.value)}>
                    {optionsCivilities}
                </select>

                <select value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
                    {optionsCategories}
                </select>
                <div>
                    <label htmlFor="lastname">Nom:</label>
                    <input type="text" name="lastname"  value={collaborator.lastname} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="firstname">Prénom:</label>
                    <input type="text" name="firstname"  value={collaborator.firstname} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email"  value={collaborator.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" name="password" value={collaborator.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmation</label>
                    <input type="password" name="confirmPassword" value={collaborator.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="phone">Téléphone:</label>
                    <input type="text" name="phone" value={collaborator.phone} onChange={handleInputChange}/>
                </div>           
                <div>
                    <label htmlFor="birthdate">Date de naissance:</label>
                    <input type="date" name="birthdate" value={collaborator.birthdate} onChange={handleInputChange}/>
                </div>                           
                <div>
                    <label htmlFor="city">Ville:</label>
                    <input type="text" name="city" value={collaborator.city} onChange={handleInputChange}/>
                </div>                                          
                <div>
                    <label htmlFor="country">Pays:</label>
                    <input type="text" name="country" value={collaborator.country} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="photo">Photo:</label>
                    <input type="text" name="photo" value={collaborator.photo} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="isAdmin">Administrateur ? :</label>
                    <input type="checkbox" name="isAdmin" value={collaborator.isAdmin} onChange={checkButtonAdmin}/>
                </div>
                <input type="submit" value="Ajouter" />
            </form>
        </>
    )
}

export default AddCollaboratorPage;