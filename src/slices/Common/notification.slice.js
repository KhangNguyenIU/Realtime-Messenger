import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    message: '',
    type: 'success',
    duration: 2000,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => ({
            ...state,
            show: true,
            ...action.payload,
        }),
        hideNotification: () => ({
            ...initialState,
        }),
    },
});

const { reducer, actions } = notificationSlice;
export const { showNotification, hideNotification } = actions;

export default reducer;
