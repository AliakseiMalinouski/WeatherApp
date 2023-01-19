import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weatherData: {
        currentTemperature: null,
        currentTemperatureMax: null,
        currentTemperatureMin: null,
        feelsLikeTemperature: null,
        currentGust: null,
        currentPressure: null,
        windSpeed: null,
    }
}

export const weatherDataSlice = createSlice({
    name: "weatherData",
    initialState,
    reducers: {
        saveData: (state, action) => {
            state.weatherData.currentTemperature = action.payload.currentTemperature;
            state.weatherData.currentTemperatureMax = action.payload.currentTemperatureMax;
            state.weatherData.currentTemperatureMin = action.payload.currentTemperatureMin;
            state.weatherData.feelsLikeTemperature = action.payload.feelsLikeTemperature;
            state.weatherData.currentGust = action.payload.currentGust;
            state.weatherData.currentPressure = action.payload.currentPressure;
            state.weatherData.windSpeed = action.payload.windSpeed;
        }
    }
})

export const {saveData} = weatherDataSlice.actions;
export default weatherDataSlice.reducer;