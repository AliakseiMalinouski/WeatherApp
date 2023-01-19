import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentPlace: {},
    loadState: 0
}

export const currentPlaceSlice = createSlice({
    name: "currentPlace",
    initialState,
    reducers: {
        updatePlace: (state, action) => {
            state.currentPlace = action.payload;
        },
        updateLoadState: (state, action) => {
            state.loadState = action.payload;
        }
    }
})

export const {updatePlace, updateLoadState} = currentPlaceSlice.actions;
export default currentPlaceSlice.reducer;