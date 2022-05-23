import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    play: false,
    sound: '',
    playInLoop: false
}

const soundSlice = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        playSound: (state, action) => ({
            ...state,
            play: true,
            sound: action.payload.sound,
            playInLoop: action.payload.playInLoop
        }),
        stopSound: () => ({
            ...initialState
        })
    }
})


const { reducer, actions} = soundSlice
export const { playSound, stopSound } = actions
export default reducer