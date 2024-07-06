import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig/axiosConfig.js";
import swal from "sweetalert2";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    const checkLoggedOrNot = () => {
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    useEffect(() => {
        checkLoggedOrNot();
    }, [token]);

    const fetchUser= async () => {
        try{
            const res = await axiosInstance.get(`/users/${token}`, {
                headers:{
                    token: token
                }
            });
            console.log(res.data);
            setUser(res.data)
        }catch (err){
            console.log(err);
            swal.fire({
                title: 'Error',
                text: err.response.data.error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <nav className="flex items-center justify-between px-5 sm:px-6 md:px-16 absolute w-full top-[0.2rem]">
            <div className="flex flex-col justify-center items-center">
                <img onClick={() => navigate('/')} src={logo} className="size-16 cursor-pointer" alt="logo" />
                <p className="text-xl hidden md:block text-PrimSilver">ActionPad</p>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button
                    onClick={() => {
                        if (loggedIn) {
                            localStorage.removeItem('token');
                            sessionStorage.removeItem('token');
                            setLoggedIn(false);
                            navigate('/login');
                        } else {
                            navigate('/login');
                        }
                    }}
                    className={`${loggedIn ? 'bg-primeRed border border-primeRed text-PrimSilver' : 'border border-PrimSilver bg-PrimSilver text-PrimePurple'} py-2 px-2 md:px-5 rounded-lg`}
                >
                    {loggedIn ? 'Logout' : 'Login'}
                </button>

                {user?.profilePicture && <img src={user?.profilePicture} className="size-12 rounded-full" width={600} height={600} alt="profile" />}
                <button
                    onClick={() => navigate('/register')}
                    className={`${loggedIn ? 'hidden' : 'block'} py-2 px-2 md:px-3.5 border border-PrimePurple rounded-lg bg-PrimePurple text-PrimSilver`}
                >
                    Register
                </button>
            </div>
        </nav>
    );
};

export default Header;
