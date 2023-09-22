import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour la connexion de l'utilisateur.
export const userLogin = createAsyncThunk('auth/login', async (credentials) => {
  try {
    // Requête POST pour la connexion en utilisant axios
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email: credentials.email, password: credentials.password }
    );

    // Récupération du token depuis la réponse du serveur
    const token = response.data.body.token;

    // Utiliser le token pour une nouvelle requête POST pour avoir les informations de l'utilisateur
    const profile = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Retourne le token et les informations du profil
    return {
      token,
      ...profile.data.body,
    };
  } catch (e) {
    throw new Error(e?.response?.data?.message || 'Server connection error');
  }
});

// Action asynchrone pour la modification de l'utilisateur.
export const updateUserUsername = createAsyncThunk('auth/updateUsername', async ({ username, token }) => {
  try {
    // Requête PUT pour la modification.
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { userName: username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update username');
    }

    return username;
  } catch (e) {
    throw new Error(e?.response?.data?.message || 'Server connection error');
  }
});

// Action asynchrone pour récupérer les transactions de l'utilisateur
export const getTransactions = createAsyncThunk('auth/getTransactions', async ({ token }) => {
  try {
    // Requête GET pour récupérer les transactions
    const response = await axios.get("http://localhost:3001/api/v1/user/profile/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch transactions');
    }

    // Retourne les transactions
    return response.data;
  } catch (e) {
    throw new Error(e?.response?.data?.message || 'Server connection error');
  }
});



// État initial
const initialState = {
  isLoading: false,     // Ajout pour l'état de chargement
  isLoggedIn: false,
  email: null,
  firstName: null,
  lastName: null,
  user: null,
  loginError: null,
  token: null,
  transactions: [],
};

// Création du slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour se connecter
    login(state, action) {
      state.isLoggedIn = true;           // Met à jour l'état pour indiquer que l'utilisateur est connecté
      state.user = action.payload;       // Stocke les informations de l'utilisateur
    },
    loginSuccess(state, action) {
      state.firstName = action.payload;
      state.lastName = action.payload;
    },
    // Action pour se déconnecter
    logout(state) {
      state.isLoggedIn = false;          // Met à jour l'état pour indiquer que l'utilisateur est déconnecté
      state.user = null;                 // Efface les informations de l'utilisateur
      state.token = null;                // Assure de réinitialiser le token lors de la déconnexion
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {            // Ajout pour l'état du chargement
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;                        // Ajout pour l'état du chargement
        state.isLoggedIn = true;                        // Met à jour l'état pour indiquer que l'utilisateur est connecté
        state.token = action.payload.token;             // Les parties payload stocke dans l'état Redux
        state.user = action.payload;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.loginError = null;                        // Réinitialise l'erreur de connexion en la mettant à null

        // Enregistrement dans localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('isLoggedIn', 'true');
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;                        // Ajout pour l'état du chargement
        state.loginError = action.error.message;

        // Suppression du localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
      })
      // ExtraReducers pour l'update
      .addCase(updateUserUsername.fulfilled, (state, action) => {
        state.user.userName = action.payload;
        state.loginError = null;

        // Mise à jour du localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.userName = action.payload;
        localStorage.setItem('user', JSON.stringify(currentUser));
      })
      .addCase(updateUserUsername.rejected, (state, action) => {
        state.loginError = action.error.message;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.error.message;
      });
  }
});

// Exporte les actions et le reducer
export const { login, loginSuccess, logout, updateTransactionCategory, updateTransactionNote } = authSlice.actions;
export default authSlice.reducer;
