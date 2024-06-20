import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:5,
    orders:[],
    search:"",
}

export const counterSlice = createSlice({
    name: "preyesh",
    initialState,
    reducers: {
        incrisr:(state)=>{
            state.value += 1;
        },
        decrice:(state)=>{
            state.value -= 1;
        },
        token:(state , action)=>{
            state.token = action.payload
        },
        orders:(state , action)=>{
            state.orders = [...state.orders , action.payload]
        },
        search:(state , action)=>{
            state.search =  action.payload
        }


    }
})
export const { incrisr , decrice , token , orders, search } = counterSlice.actions

export default counterSlice.reducer