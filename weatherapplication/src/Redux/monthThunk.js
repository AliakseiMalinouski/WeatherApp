import { getDate } from "./dateSlice";

export const monthThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/df3e67cd150d1f2203aecce51b4d673c/raw/ea27a1d0cc1dea6210d4137543e36a75c1861667/MonthArrayWeatherApp")
    .then(response => {
        if(!response.ok) {
            alert("Error with download");
        }
        else {
            return response.json();
        }
    })
    .then(data => {
        dispatch(getDate({month: data}));
    })
    .catch(error => {
        alert("Error with download");
    })
}