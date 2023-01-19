
import React from "react";
import {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { api } from "../Api/api";
import { updatePlace, updateLoadState } from "../Redux/currentPlaceSlice";
import { Data } from "./Data";
import { daysThunk } from "../Redux/daysThunk";
import { updateTime } from "../Redux/timeSlice";
import { weatherEvents } from "../events";
import { backgroundThunk } from "../Redux/backgroundThunk";
import { Error } from "./Error";
import { Hint } from "./Hint";
import { Loading } from "./Loading";

export const Main = React.memo(() => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(daysThunk)
    }, [dispatch]);

    useEffect(() => {
        dispatch(backgroundThunk);
    }, [dispatch])

    useEffect(() => {
        weatherEvents.addListener("PutWeather", changeFlagBackground);
        return () => {
            weatherEvents.removeListener("PutWeather", changeFlagBackground);
        }
    }, []);

    const currentPlace = useSelector(state => state.currentPlace.currentPlace);
    const loadState = useSelector(state => state.currentPlace.loadState);
    const date = useSelector(state => state.date.date);
    const time = useSelector(state => state.time.time);
    const backgrounds = useSelector(state => state.background.backgrounds);

    const [searchValue, setSearchValue] = useState("");
    const [background, setBackground] = useState("");
    const [flag, setFlag] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const createDate = useCallback(() => {
        let dateHash = new Date();
        let day = date[0] === undefined ? null : date[0].days[dateHash.getDay()];
        let number = dateHash.getDate();
        let mounth = date[1] === undefined ? null : date[1].months[dateHash.getMonth()];
        let year = dateHash.getFullYear();
        let hours = dateHash.getHours();

        dispatch(updateTime({
            day: day,
            number: number,
            month: mounth,
            year: year,
            hours: hours
        }));
    }, [date, dispatch])

    const changeBackground = useCallback(() => {
        let neededWeather = backgrounds.find(el => {
            return el.name === flag;
        });
        let temp = temperature;
        if((time.hours >= 0 && time.hours <= 7) && neededWeather !== undefined) {
            let randomBackground = Math.floor(Math.random() * backgrounds[neededWeather.code - 1].night.length);
            setBackground(backgrounds[neededWeather.code - 1].night[randomBackground]);
        }
        else if((time.hours >= 7 && time.hours <= 17) && neededWeather !== undefined) {
            let randomBackground = Math.floor(Math.random() * backgrounds[neededWeather.code - 1].morning.length);
            setBackground(backgrounds[neededWeather.code - 1].morning[randomBackground]);
        }
        else if((time.hours >= 17 && time.hours <= 23) && neededWeather !== undefined) {
            let randomBackground = Math.floor(Math.random() * backgrounds[neededWeather.code - 1].evening.length);
            setBackground(backgrounds[neededWeather.code - 1].evening[randomBackground]);
        }
        else if(flag === null && (time.hours >= 7 && time.hours <= 17)) {
            setBackground("https://i.ibb.co/WBLLv1j/day-theme.png");
        }
        else if(flag === null && (time.hours >= 17 && time.hours < 23)) {
            setBackground("https://i.ibb.co/t4Tr41G/evening-theme.png");
        }
        else if(flag === null && (time.hours >= 0 && time.hours < 7)) {
            setBackground("https://images.unsplash.com/photo-1568233823082-873ab0156ad7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
        }
    }, [backgrounds, flag, time.hours, temperature])

    const changeFlagBackground = (temp, weatherState) => {
        if(temp !== null && weatherState !== null) {
            setTemperature(temp);
            setFlag(weatherState);
        }
    }

    useEffect(() => {
        createDate();
    }, [createDate]);

    useEffect(() => {
        changeBackground();
    }, [changeBackground]);

    const loadWeatherCurrentPlace = () => {
        if(loadState === 2) dispatch(updateLoadState(1));
        dispatch(updateLoadState(1));
        fetch(`${api.base}weather?q=${searchValue}&units=metric&APPID=${api.key}`,
        
            {
                method: 'get'
            }

        )
        .then(response => {
            if(!response.ok) {
                alert("Download error or entered value is incorrect");
                dispatch(updateLoadState(3));
            }
            else {
                return response.json();
            }
        })
        .then(data => {
            dispatch(updateLoadState(2));
            dispatch(updatePlace(data));
            setSearchValue("");
            setIsActive(false);
        })
        .catch(error => {
            alert("Download error or entered value is incorrect");
            dispatch(updateLoadState(3));
        })
    }


    return (
        <div className="Main" style={{backgroundImage: `url(${background})`, transition: loadState === 0 ? "" : "background-image 1s ease-in-out"}}>
            <div className="Gradient">
                <div className="FlexblBlock">
                    <div className="CurrrentDate">
                        <div className="Date">
                            <p>{time.day} {time.number} {time.month} {time.year}</p>
                        </div>
                    </div>
                <div className="Tools">
                        <input type='text' placeholder="Name of country or city" value={searchValue} onChange={
                            (EO) => {
                                setSearchValue(EO.target.value);
                                EO.target.value.length > 2 ? setIsActive(true) : setIsActive(false);
                            }
                        }/>
                        {
                            (!isActive)
                            ?
                            <button disabled={true} type='button'>Check the weather</button>
                            :
                            <button onClick={loadWeatherCurrentPlace} type='button'>Check the weather</button>
                        }
                </div>
                    {(loadState===0 && <Hint/>)}
                    {(loadState===1 && <Loading/>)}
                    {((loadState === 2 && currentPlace !== {}) && currentPlace !== undefined)
                        ?
                        (loadState===2 && <Data 
                            key={currentPlace.id}
                            name={currentPlace.name}
                            weather={currentPlace.weather[0]}
                            wind={currentPlace.wind}
                            main={currentPlace.main}
                            days={date[0].days}
                            months={date[1].months}
                            />)
                            :
                            null
                    }
                    {(loadState === 3 || currentPlace === undefined || currentPlace === {}) && <Error/>}
                </div>
            </div>
        </div>
    )
})