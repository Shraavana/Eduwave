import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import authReducer from '../redux/slices/authSlice';
// Import other reducers as needed
// import userReducer from './slices/userSlice';
// import courseReducer from './slices/courseSlice';

// Persist configuration for auth slice
const authPersistConfig = {
  key: 'authentication_user',
  storage,
  // Optionally whitelist specific parts of the state to persist
  whitelist: ['isAuthenticated', 'userid', 'username', 'isAdmin', 'isTeacher']
};

// Create persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    authentication_user: persistedAuthReducer,
    // Add other reducers here
    // users: userReducer,
    // courses: courseReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
