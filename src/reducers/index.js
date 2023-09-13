// Importe la fonction `combineReducers` de Redux.
// Cette fonction est utilisée pour combiner plusieurs reducers en un seul.
import { combineReducers } from 'redux';

// Importe le reducer `authReducer` depuis le fichier `authSlice.js`.
import authReducer from '../slices/authSlice';

// Utilise `combineReducers` pour créer un `rootReducer`.
// Dans cet exemple, `rootReducer` contient un seul reducer : `authReducer`.
// La clé `auth` est utilisée pour accéder à la partie de l'état gérée par `authReducer`.
const rootReducer = combineReducers({
  auth: authReducer,
});

// Exporte le `rootReducer` pour qu'il puisse être utilisé dans le store Redux.
export default rootReducer;
