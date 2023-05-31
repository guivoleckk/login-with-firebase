import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import '../../styles/style.css';


export const Login = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    async function loginGoogle() {
        await signInGoogle();
    }



    if (!signed) {

    return (
            <div className="main-login">
                <div className="div-get-button">
                <button
                className="button-login"
                onClick={loginGoogle}
                >
                Logar com o google
                </button>
                </div>
            </div>
            )
    } else {
        return <Navigate to="/home"/>
    }
            
};