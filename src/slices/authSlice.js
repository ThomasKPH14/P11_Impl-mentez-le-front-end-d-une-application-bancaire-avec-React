// Importation de createSlice depuis Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Un payload est une donnée que j'envoie avec une action. 

// Créer une action asynchrone pour la connexion de l'utilisateur
export const userLogin = createAsyncThunk('auth/login', async (credentials) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  console.log('Server Response:', data);


  if (!response.ok) {
    const errorData = await response.json();
    console.log("Server Error Response:", errorData);
    throw new Error(errorData.message || 'Could not login.');
  }
  
  return data;
});

// État initial pour ce slice de l'application
const initialState = {
  isLoggedIn: false, // Indique si l'utilisateur est connecté ou non
  user: null,         // Stocke les informations de l'utilisateur connecté
  loginError: null,   
};

// Création du slice pour la gestion de l'authentification
const authSlice = createSlice({
  name: 'auth',          // Nom du slice
  initialState,          // État initial
  reducers: {
    // Action pour se connecter
    login(state, action) {
      state.isLoggedIn = true;           // Met à jour l'état pour indiquer que l'utilisateur est connecté
      state.user = action.payload;       // Stocke les informations de l'utilisateur
    },
    // Action pour se déconnecter
    logout(state) {
      state.isLoggedIn = false;          // Met à jour l'état pour indiquer que l'utilisateur est déconnecté
      state.user = null;                 // Efface les informations de l'utilisateur
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loginError = null;  // Réinitialisez l'erreur lors d'une connexion réussie
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginError = "Les identifiants de connexion sont incorrects ou vous n'êtes pas encore inscrit.";
      });
  }
});

// Exporte les actions générées automatiquement pour ce slice
export const { login, logout } = authSlice.actions;

// Exporte le reducer pour l'utiliser dans le store Redux
export default authSlice.reducer;
