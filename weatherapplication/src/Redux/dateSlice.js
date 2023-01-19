import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: []
}

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        getDate: (state, action) => {
            state.date = action.payload;
        }
    }
});

export const {getDate} = dateSlice.actions;
export default dateSlice.reducer;