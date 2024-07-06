import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/header/Header";

const AppLayout = () => {
    return (
        <div className={`text-PrimSilver`}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default AppLayout;