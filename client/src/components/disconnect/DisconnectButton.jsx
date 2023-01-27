import { useNavigate } from "react-router";
import { useDispatch  } from "react-redux";
import { userDisconnection } from "../../actions/userActions";

const DisconnectButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Fonction déclenchée au click sur le bouton Déconnexion.
    const onClickDisconnect = () => {
  
        // On vide les données de session en rétablissant un tableau vide et on supprime le token. Puis on redirige vers la page de login.
        dispatch({
            type:'userSession/logout'
        })
        localStorage.removeItem('token');
  
        navigate('/');
  
    }

    return (
        <button onClick={onClickDisconnect}>Déconnexion</button>
    )
}

export default DisconnectButton;