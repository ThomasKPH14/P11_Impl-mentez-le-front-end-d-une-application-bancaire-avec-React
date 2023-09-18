import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation des différentes pages de l'application
import Index from '../../pages/Index'; // Page d'accueil
import SignIn from '../../pages/SignIn'; // Page affichant la connexion au compte
import User from '../../pages/User'; // Page de l'utilisateur

// Importation des composants Navbar et Footer
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';

// Composant principal de l'application (router)
const AppRouter = () => {
  return (
    <Router>
      <Navbar /> {/* Affiche le composant Navbar au sommet de chaque page */}
      <Routes>
        {/* Définition des différentes routes et des composants à rendre pour chaque URL */}
        <Route path="/" element={<Index />} /> {/* Route de la page d'accueil */}
        <Route path="/login" element={<SignIn />} /> {/* Page affichant la connexion au compte */}
        <Route path="/profile" element={<User />} /> {/* Page de l'utilisateur*/}
      </Routes>
      <Footer /> {/* Affiche le composant Footer au bas de chaque page */}
    </Router>
  );
};

export default AppRouter;