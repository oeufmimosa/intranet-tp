import { useState} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { userConnection } from "../../actions/userActions";
import './../../style/form.css';

const Login = () => {

    // On récupère les informations du reducer de l'utilisateur connecté.
    const { userSession } = useSelector( state => state.collaboratorReducer );

    // On créé un state pour les informations de connexion.
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fonction qui assigne les valeurs aux inputs.
    const handleInputChange = (event) => {
        const {value, name} = event.target

        const updateUserLogin = {
            ...userLogin,
            [name]: value
        }

        setUserLogin(updateUserLogin)
    }

    // Fonction qui vérifie le formulaire.
    const onSubmitLoginForm = async (e) => {

        e.preventDefault();

        // On créé un objet contenant l'email et le mot de passe.
        const userInfos = {
            email: userLogin.email,
            password: userLogin.password
        };

        const url = 'http://localhost:9000/api/login';

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userInfos)
        }

        const response = await fetch(url, options);
        const result = await response.json();

        localStorage.removeItem('token');
        localStorage.setItem('token', result.token);

        // S'il n'y a pas d'erreurs...
        if(!result.error)
        {      
            
            // On assigne les informations récupérées depuis le serveur Node.js au reducer correspondant userConnection.
            dispatch(userConnection({
                userConnection: {
                    id: result.user.id,
                    gender: result.user.gender,
                    firstname: result.user.firstname,
                    lastname: result.user.lastname,
                    email: result.user.email,
                    password: result.user.password,
                    phone: result.user.phone,
                    birthdate: result.user.birthdate,
                    city: result.user.city,
                    country: result.user.country,
                    photo: result.user.photo,
                    service: result.user.service,
                    isAdmin: result.user.isAdmin
                }
            }))

            if(result.success)
            {
                alert(result.success);
            }

            navigate('/accueil');
        }
        
        if(result.error)
        {
            alert(result.error);
        }
    }

    return (
        <>
            {!userSession.userConnection ? 
                <div className="login-box">
                    <h3 >Connexion</h3>
                    <form method="POST" onSubmit={onSubmitLoginForm}>
                        <div className="user-box">
                            <input type="email" name="email"  value={userLogin.email} onChange={handleInputChange}/>
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="user-box">
                            
                            <input type="password" name="password"  value={userLogin.password} onChange={handleInputChange}/>
                            <label htmlFor="password">Mot de passe:</label>
                        </div>
                        <input className="submitButton"type="submit" value="Se connecter" />
                    </form>
                </div>
            : <p>Vous êtes déjà connecté</p>}
        </>
    )
}

export default Login;