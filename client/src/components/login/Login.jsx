import { useState} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import { userConnection } from "../../actions/userActions";

const Login = () => {


    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {value, name} = event.target

        const updateUserLogin = {
            ...userLogin,
            [name]: value
        }

        setUserLogin(updateUserLogin)
    }

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();

        if(userLogin.email.trim().length === 0 || userLogin.password.trim().length === 0)
        {

        }

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


        if(!result.error)
        {      
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

            navigate('/accueil');
        }
    }

    return (
        <>
            <h3>Connexion</h3>
            <form method="POST" onSubmit={onSubmitLoginForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email"  value={userLogin.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" name="password"  value={userLogin.password} onChange={handleInputChange}/>
                </div>
                <input type="submit" value="Se connecter" />
            </form>
        </>
    )
}

export default Login;