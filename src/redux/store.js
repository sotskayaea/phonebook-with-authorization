import { configureStore } from '@reduxjs/toolkit';
import { filterSliceReducer } from './filterSliceReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contactsSliceReducer';
import { authReducer } from './auth/authSliceReducer';
// import { combineReducers } from 'redux';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// const reducers = combineReducers({
//   filter: filterSliceReducer.reducer,
//   contacts: contactsReducer,
//   auth: persistReducer(authPersistConfig, authReducer),
// });

export const store = configureStore({
  reducer: {
    filter: filterSliceReducer.reducer,
    contacts: contactsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
