const { createSlice } = require("@reduxjs/toolkit");


const initialState= {
    show: false,
    type: 'GENERAL'
}
const loadingSlice =createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading: (state, action) => ({
            ...state,
            show: true,
            type: action?.payload?.type || 'GENERAL',
        }),
        hideLoading: () => ({
            ...initialState,
        }),
    
    }
})

const {reducer, actions} = loadingSlice;
export const {showLoading, hideLoading} = actions;

export default reducer;