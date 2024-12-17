import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'authentication_user',
  initialState: {
    isAuthenticated: false,
    userid: null,
    username: null,
    isAdmin: false,
    isTeacher: false
  },
  reducers: {
    setAuthentication: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    logout: (state) => {
      // Reset to initial state
      return {
        isAuthenticated: false,
        userid: null,
        username: null,
        isAdmin: false,
        isTeacher: false
      };
    }
  }
});

export const { setAuthentication, logout } = authSlice.actions;

// Async login action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users/login/', credentials);
    
    const { userid, username, is_tutor, access_token, refresh_token } = response.data;

    // Store tokens in localStorage
    localStorage.setItem('access', access_token);
    localStorage.setItem('refresh', refresh_token);
    localStorage.setItem('userid', userid);

    dispatch(setAuthentication({
      isAuthenticated: true,
      userid,
      username,
      isTeacher: is_tutor,
      isAdmin: false  // Adjust as needed
    }));

    return response;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export default authSlice.reducer;