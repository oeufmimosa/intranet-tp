import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const Info = () => {
    const { userSession } = useSelector( state => state.collaboratorReducer );

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
    })

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

    const onSubmitForm = async (e) => {
        e.preventDefault();


        const url = `http://localhost:9000/api/collaborateurs/${user.id}`;
        const localToken = localStorage.getItem('token');

        console.log(user);

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localToken
            },
            method: "PUT",
            body: JSON.stringify(user)
        }

        if(checkForm(user) === true)
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
            // user.password.trim().length === 0 ||
            user.phone.trim().length === 0 ||
            user.birthdate.trim().length === 0 ||
            user.city.trim().length === 0 ||
            user.country.trim().length === 0 ||
            user.photo.trim().length === 0 ||
            !user.service)
        {

            window.alert('Certains champs ne sont pas complétés');

            return false;
        }

        return true;
    }

    const handleInputChange = (event) => {
        
        const {value, name} = event.target

        const updateUser = {
            ...user,
            [name]: value
        }

        setUser(updateUser);
    }

    const fetchCurrentUser = async () => {

        const url = `http://localhost:9000/api/collaborateurs/${userSession.userConnection.id}`;
        const localToken = localStorage.getItem('token');

        console.log(user);

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
            <h3>Informations personnelles</h3>
            <form onSubmit={onSubmitForm} method="POST">
            <select value={user.gender} name="gender" onChange={handleInputChange}>
                    {optionsCivilities}
                </select>
                <select value={user.service} name="service" onChange={handleInputChange}>
                    {optionsCategories}
                </select>
                <div>
                    <label htmlFor="lastname">Nom:</label>
                    <input type="text" name="lastname"  value={user.lastname} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="firstname">Prénom:</label>
                    <input type="text" name="firstname"  value={user.firstname} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email"  value={user.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmation</label>
                    <input type="password" name="confirmPassword" value={user.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="phone">Téléphone:</label>
                    <input type="text" name="phone" value={user.phone} onChange={handleInputChange}/>
                </div>           
                <div>
                    <label htmlFor="birthdate">Date de naissance:</label>
                    <input type="date" name="birthdate" value={user.birthdate} onChange={handleInputChange}/>
                </div>                           
                <div>
                    <label htmlFor="city">Ville:</label>
                    <input type="text" name="city" value={user.city} onChange={handleInputChange}/>
                </div>                                          
                <div>
                    <label htmlFor="country">Pays:</label>
                    <input type="text" name="country" value={user.country} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="photo">Photo:</label>
                    <input type="text" name="photo" value={user.photo} onChange={handleInputChange}/>
                </div>
                <input type="submit" value="Modifier" />
            </form>
        </>
    )
}

export default Info;