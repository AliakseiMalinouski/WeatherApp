import React from "react";
import {Route, Routes} from 'react-router-dom';
import { PageMain } from "../Pages/PageMain";

export const PageRouter = () => {
    return (
        <Routes>
        <Route path="/" element={<PageMain/>}/>
        </Routes>
    )
}