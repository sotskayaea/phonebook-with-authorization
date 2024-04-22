import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'api/authService';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'users/register',
  async (newUser, thunkAPI) => {
    try {
      const res = await authService.registerUser(newUser);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk('users/login', async (user, thunkAPI) => {
  try {
    const res = await authService.loginUser(user);
    // After successful login, add the token to the HTTP header
    setAuthHeader(res.token);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const res = await authService.logOutUser(); // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await authService.refreshUser();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
