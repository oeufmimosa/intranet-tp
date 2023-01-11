import { useParams } from "react-router";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

const UpdateCollaborator = ( props ) => {


    const { id } = props;
    
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

    const [isLoading, setIsLoading] = useState(true);
    
    const fetchCollaborator = async () => {

        const url = `http://localhost:9000/api/collaborateurs/${id}`;
        const currentToken = localStorage.getItem('token');

        const options = {
            method: 'get',
            headers: {
                'Authorization': currentToken
            }
        }
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        setCollaborator(result);
        setIsLoading(false);
    }

    const civilities = [
        {value: "male", text: "Homme"}, 
        {value: "female", text: "Femme"}, 
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

    console.log(collaborator);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        console.log(collaborator);

        const url = `http://localhost:9000/api/collaborateurs/${collaborator.id}`;
        const localToken = localStorage.getItem('token');

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "PUT",
            body: JSON.stringify(collaborator)
        }
        
        const response = await fetch(url, options)
        const result = await response.json();
    }

    const handleInputChange = (event) => {
        
        const {value, name} = event.target

        const updatecollaborator = {
            ...collaborator,
            [name]: value
        }

        setCollaborator(updatecollaborator);
    }

    useEffect(() => {
        fetchCollaborator()
    }, [])

    return (
        <>
            <h3>Modifier un collaborateur</h3>
            <form onSubmit={onSubmitForm} method="POST">

                <select value={collaborator.gender} name="gender" onChange={handleInputChange}>
                    {optionsCivilities}
                </select>

                <select value={collaborator.service} name="service" onChange={handleInputChange}>
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
                <input type="submit" value="Modifier" />
            </form>
        </>
    )
}

export default UpdateCollaborator;