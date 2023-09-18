import React, { useEffect } from 'react';
import Routes from './components/routes/index';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './slices/authSlice';  // Assurez-vous d'importer la bonne action

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);   // Ajout pour l'état du chargement

  useEffect(() => {
    // Charger les données de l'utilisateur depuis localStorage
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    
    if (storedUser && isLoggedIn === 'true') {
      dispatch(login(JSON.parse(storedUser)));
      console.log("Inside useEffect");
      console.log("Stored User:", storedUser);
      console.log("Is Logged In:", isLoggedIn);
      console.log("Dispatched login");
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Affiche un indicateur de chargement
  }

  return (
    <Routes />
  );
}

export default App;
