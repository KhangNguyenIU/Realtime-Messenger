import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'services/auth/auth.service';
import { showNotification } from 'slices/Common/notification.slice';

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (data, thunkAPI) => {
        try {
            const response = await authService.login(data);
            if (response) {
                localStorage.setItem('token', response?.data?.token);
                thunkAPI.dispatch(showNotification({ message: 'login sucess' , type:'success' }));
                window.location.href = '/';
            }
            return response?.data;
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.error || 'Internal Server Error', type: 'error' }));
            return thunkAPI.rejectWithValue();
        }
    },
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (data, thunkAPI) => {
        const { body, callback} = data
        console.log(body, callback)
        try {
            const response = await authService.signup(body);
            if (response) {
                thunkAPI.dispatch(showNotification({ message: 'Register account sucess', type:'success' }));
                // window.location.href = '/';
                if(callback && typeof callback === 'function'){
                    callback()
                }
            }
            return response?.data;
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.error || 'Internal Server Error', type: 'error' }));
            return thunkAPI.rejectWithValue();
        }
    },
);

export const signoutUser = createAsyncThunk(
    'auth/signoutUser',
    async (data, thunkAPI) => {
        try {
            const response = await authService.logout();
            if (response) {
                // localStorage.removeItem('token');
                thunkAPI.dispatch(showNotification({ message: 'logout sucess' }));
                window.location.href = '/';
            }
            return response?.data;
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.error || 'Internal Server Error', type: 'error' }));
            return thunkAPI.rejectWithValue();
        }
    },
);

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (data, thunkAPI) => {
        try {
            const response = await authService.getAuthUser();
            if (response?.data) {
                thunkAPI.dispatch(setUserData(response.data));
            }
            return { user: response.data };
        } catch (error) {
            return error.message;
        }
    },
);

const initialState = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => ({ ...action.payload }),
        clearUserData: () => ({}),
    },
});

const { reducer, actions } = authSlice;

export const { setUserData, clearUserData } = actions;
export default reducer;
