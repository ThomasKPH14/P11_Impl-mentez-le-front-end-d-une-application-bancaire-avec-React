// Importation des dépendances nécessaires.
import React from 'react';
// import { useNavigate } from 'react-router-dom'; // useHistory permet de naviguer entre les pages.

const SignIn = () => {
    // const history = useNavigate();

    // const handleSignIn = () => {
    //     // Logique d'authentification (si nécessaire)

    //     // Rediriger vers la page /user
    //     history.push('/user');
    // };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button
                        // onClick={handleSignIn} 
                        className="sign-in-button"
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};
export default SignIn;
