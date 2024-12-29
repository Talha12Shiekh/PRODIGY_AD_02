import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    userLoading: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {

        setuser: (state, action) => {
            state.user = action.payload
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },

    },
})

export const { setuser,setUserLoading } = userSlice.actions

export default userSlice.reducer