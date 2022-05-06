
import { createSlice} from '@reduxjs/toolkit'

const socketSlice = createSlice({
    name: 'socket',
    initialState: 1,
    reducers: {
        initSocket : (state, action)=>{
            state = action.payload
        },
        closeSocket : (state, action)=>{
            state = null
        }
    }
})

const { reducers, actions} = socketSlice
export const { initSocket, closeSocket } = actions
export default reducers