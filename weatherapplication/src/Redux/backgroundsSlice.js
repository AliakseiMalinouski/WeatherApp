import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backgrounds: []
}

export const backgroundsSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        getBackgrounds: (state, action) => {
            state.backgrounds = action.payload;
        }
    }
})

export const {getBackgrounds} = backgroundsSlice.actions;
export default backgroundsSlice.reducer;