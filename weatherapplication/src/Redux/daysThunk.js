import { getDate } from "./dateSlice";

export const daysThunk = (dispatch) => {
    fetch("https://gist.githubusercontent.com/AliakseiMalinouski/7e21a5807a19fd35699520dfb2c67f82/raw/54f7d5339bbf5974c7663abde5ff587dc3d6993d/DateWeatherApp")
    .then(response => {
        if(!response.ok) {
            alert("Error with download");
        }
        else {
            return response.json();
        }
    })
    .then(data => {
        dispatch(getDate(data));
    })
    .catch(error => {
        alert("Error with download");
    })
}