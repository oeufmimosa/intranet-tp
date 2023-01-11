import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import './../../style/form.css';

const Info = () => {
    const { userSession } = useSelector( state => state.collaboratorReducer );

    const [confirmPassword, setConfirmPassword] = useState('');

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
        isAdmin:userSession.userConnection ? true : false
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

        const url = `http://localhost:9000/api/collaborateurs/${userSession.userConnection.id}`;
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

        if(checkForm(user) === true)
        {            
            const response = await fetch(url, options)
            const result = await response.json();
            
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
            console.log(user);
            
            window.alert('Certains champs ne sont pas complétés');
            return false;
        }

        if(user.password != confirmPassword)
        {
            window.alert('Le mot de passe et sa confirmation sont différents');
            return false;
        }

        if(emailIsValid(user.email) ==false)
        {
            window.alert('Le format d\'email est incorrect');
            return false;
        }

        return true;
    }

    const emailIsValid = (email) =>
    {
        return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
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

        // console.log(user);

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

        console.log(result);
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
            <select  className="select" value={user.gender} name="gender" onChange={handleInputChange}>
                    {optionsCivilities}
                </select>
                <select className="select" value={user.service} name="service" onChange={handleInputChange}>
                    {optionsCategories}
                </select>
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
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}/>
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
                <input class="submitButton" type="submit" value="Modifier" />
            </form>
        </div>
           
        </>
    )
}

export default Info;