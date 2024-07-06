import React, { useEffect, useState } from 'react';
import axiosInstance from "../../axiosConfig/axiosConfig.js";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader.jsx";
import swal from "sweetalert2";

const PrivateRoutes = ({ children }) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const [isBusy, setIsBusy] = useState(true); // State to manage loading
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication status
    const navigate = useNavigate();

    const checkToken = async () => {
        try {
            const res = await axiosInstance.post('/users/checkToken', { token: token });
            setIsAuthenticated(true); // Set authentication to true if token is valid
        } catch (err) {
            setIsAuthenticated(false); // Set authentication to false if token is invalid
            swal.fire({
                title: 'Error',
                text: 'Session expired or invalid token. Please log in again.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            navigate('/login'); // Navigate to login page if token is invalid
        } finally {
            setIsBusy(false); // Set loading state to false after checking token
        }
    }

    useEffect(() => {
        if (token) {
            checkToken(); // Check the token on component mount if token exists
        } else {
            setIsBusy(false);
            navigate('/login'); // Navigate to login if token does not exist
        }
    }, [token, navigate]);

    if (isBusy) {
        // Display loader while checking the token
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <Loader />
            </div>
        );
    }

    // Render children if authenticated, otherwise navigate to login
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
