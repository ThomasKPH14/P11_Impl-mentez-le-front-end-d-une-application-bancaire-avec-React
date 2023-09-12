// Importation des bibliothèques et des composants nécessaires
import React from 'react';
import { NavLink } from 'react-router-dom'; 
import Logo from '../assets/argentBankLogo.png'; // Importation du logo

function Navbar() {
    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo"> {/* Lien vers la page d'accueil avec le logo */}
                <img src={Logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                <NavLink to="/sign-in" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
