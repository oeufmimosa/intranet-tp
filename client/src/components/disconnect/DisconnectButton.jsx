import { useNavigate } from "react-router";
import { useDispatch  } from "react-redux";
import { userDisconnection } from "../../actions/userActions";

const DisconnectButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const onClickDisconnect = () => {
  
        dispatch(userDisconnection())
        localStorage.removeItem('token');
  
        navigate('/');
  
    }

    return (
        <button onClick={onClickDisconnect}>Déconnexion</button>
    )
}

export default DisconnectButton;