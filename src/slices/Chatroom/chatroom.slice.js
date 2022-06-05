const { createSlice } = require("@reduxjs/toolkit");

const initialState ={}
const chatroomSlice = createSlice({
    name : 'chatroom',
    initialState: {},
    reducers:{
        setChatroom : (state, action)=>({
            ...action.payload
        }),
        clearChatroom : ()=>({
           ...initialState
        }),
        updateChatroom : (state, action)=>({
            ...state,
            ...action.payload
        })
    }
})

const {reducer, actions} = chatroomSlice;
export const {setChatroom, clearChatroom, updateChatroom} = actions;
export default reducer;