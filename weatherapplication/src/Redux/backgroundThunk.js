import { getBackgrounds } from "./backgroundsSlice";

export const backgroundThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/883db6aebf765fa6618840b850bfb6f0/raw/be79cdaa8d21730ef8cd898947a703f78da8ee4f/BackgroundWeatherApp", {method: 'get'})
    .then(response => {
        if(!response.ok) {
            alert("Error with download");
        }
        else {
            return response.json();
        }
    })
    .then(data => {
        dispatch(getBackgrounds(data));
    })
    .catch(error => {
        alert("Error with download");
    })
}