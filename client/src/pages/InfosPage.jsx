import { useState } from "react"

import { useSelector } from "react-redux"

const InfosPage = () => {

    const civilities = [
        {value: "male", text: "Homme"}, 
        {value: "female", text: "Femme"}, 
      ]

    const categories = [
        {value:'Carketing', text:'Marketing'},
        {value:'Technique', text:'Technique'},
        {value:'Client', text:'Client'}
    ]

        const optionsCivilities = civilities.map((option, i) => {
            return <option key={i} value={option.value}>{option.text}</option>
        })

        
        const optionsCategories = categories.map((option, i) => {
            return <option key={i} value={option.value}>{option.text}</option>
        })

        const [civility, setCivility] = useState('')
        const [category, setCategory] = useState('')

        const { userSession } = useSelector( state => state.collaboratorReducer );

        const [user, setUser] = useState({
            id: userSession.userConnection.id,
            gender: userSession.userConnection.civility,
            firstname: userSession.userConnection.firstname,
            lastname: userSession.userConnection.lastname,
            email: userSession.userConnection.email,
            password: userSession.userConnection.password,
            phone: userSession.userConnection.phone,
            birthdate: userSession.userConnection.birthdate,
            city: userSession.userConnection.city,
            country: userSession.userConnection.country,
            photo: userSession.userConnection.photo,
            service: userSession.userConnection.service,
            isAdmin: userSession.userConnection.isAdmin
        })

        const onSubmitForm = async (e) => {
            e.preventDefault();
            user.gender = civility;
            user.service = category;

            console.log(user);
    
            const url = `http://localhost:9000/api/collaborateurs/${user.id}`;
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
            
            const response = await fetch(url, options)
            const result = await response.json();
        }

        const handleInputChange = (event) => {
            
            const {value, name} = event.target
    
            const updateUser = {
                ...user,
                [name]: value
            }
    
            setUser(updateUser);
        }

    return (
        <>
            <h3>Informations personnelles</h3>
            <form onSubmit={onSubmitForm} method="POST">

                <select value={civility} onChange={(e) => setCivility(e.target.value)}>
                    {optionsCivilities}
                </select>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

export default InfosPage;