import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate permet de naviguer entre les pages.

// Importe les hooks useDispatch et useSelector depuis la bibliothèque react-redux.
// useDispatch envoie les actions, va modifier l'état du store.
// useSelector extrait les données depuis le store.
import { useDispatch, useSelector } from 'react-redux';

// Importe l'action asynchrone "login" depuis le fichier authSlice
import { userLogin } from '../slices/authSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    
    // Utilise le hook useSelector pour accéder à la partie "isLoggedIn" du store Redux, state.auth.isLoggedIn renvoie la valeur de la propriété isLoggedIn.
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const loginError = useSelector(state => state.auth.loginError);

    // Redirection vers la page spécifique
    const navigate = useNavigate();

    // Initialise une nouvelle variable d'état "email" et la fonction "setEmail" pour la mettre à jour.
    // La valeur initiale de "email" est une chaîne vide.
    const [email, setEmail] = useState('');
    // Pareil que pour "email" mais concernant le password
    const [password, setPassword] = useState('');

    const user = useSelector(state => state.auth.user);
    
    // Ecoute le changement isLoggedIn et redirige l'utilisateur vers son compte
    useEffect(() => {
        if (isLoggedIn && user) {
            const userId = user.id;// récupérez l'ID de l'utilisateur depuis le state Redux ou autre
            navigate(`/user/${userId}`);
        }
      }, [isLoggedIn, navigate, user]);

    // Définit la fonction handleSignIn qui sera exécutée lors du clic sur le bouton
    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await dispatch(userLogin({ email, password }));
          } catch (error) {
            // Afficher l'erreur si la connexion échoue
            console.error("Login failed:", error.message);
          }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>  {/* il est demandé le mail et non username comme afficher dans la maquette*/}
                        <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button onClick={handleSignIn} className="sign-in-button">Sign In</button>
                </form>
                {loginError && <p className="error-message">{loginError}</p>}
            </section>
        </main>
    );
};
export default SignIn;
