import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    userLoading: false,
    userimage:null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

        setuser: (state, action) => {
            state.user = action.payload
        },
        setuserimage: (state, action) => {
            state.userimage = action.payload
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },

    },
})

export const { setuser,setUserLoading,setuserimage } = userSlice.actions;

export default userSlice.reducer