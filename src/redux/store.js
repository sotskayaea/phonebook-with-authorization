import { configureStore } from '@reduxjs/toolkit';
import { filterSliceReducer } from './filterSliceReducer';
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
import contactsReducer from './contactsSliceReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  filter: filterSliceReducer.reducer,
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck:
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        false,
    }),
});
