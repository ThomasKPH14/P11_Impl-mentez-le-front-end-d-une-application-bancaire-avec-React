import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/argentBankLogo.png'; // Importation du logo
import IconUser from '../assets/icon-user.png';
import IconParameter from '../assets/icon-parameter.png';
import IconLogout from '../assets/icon-logout.png';
import { logout } from '../slices/authSlice';

function Navbar() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);       // Vérifie si l'utilisateur est connecté
    const username = useSelector((state) => state.auth.user?.userName);     // Récupère username

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirige vers la page d'accueil
  };

    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo"> {/* Lien vers la page d'accueil avec le logo */}
                <img src={Logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className="main-nav-item-container">
                <NavLink to="/login" className="main-nav-item">
                    {isLoggedIn ? (
                        <>
                            <span>{username}</span>
                            <img src={IconUser} alt='User icon' className="main-nav-item-icon" />
                        </>
                    ) : (
                        <>
                            <img src={IconUser} alt='User icon' className="main-nav-item-icon" />
                            <span>Sign In</span>
                        </>
                    )}
                </NavLink>
                {isLoggedIn && (
                    <>
                        <button className="no-border-button">
                            <img src={IconParameter} alt="Icon parameter" className="main-nav-item-icon" />
                        </button>
                        <button className="no-border-button">
                            <img src={IconLogout} alt="Icon logout" className="main-nav-item-icon" onClick={handleLogout}/>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
