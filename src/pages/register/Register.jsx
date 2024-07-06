import React, {useState} from 'react';
import bg2 from '../../assets/bg2.jpg'
import {useNavigate} from "react-router-dom";
import swal from "sweetalert2";
import axiosInstance from "../../axiosConfig/axiosConfig.js";

const Register = () => {
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [dateOfBirthFocus, setDateOfBirthFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [rePasswordFocus, setRePasswordFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
        } else {
            try {
                const response = await axiosInstance.post('/users', {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: new Date(dateOfBirth).toISOString().slice(0,-1),
                    email: email,
                    password: password,
                });
                swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    title: 'Success',
                    text: 'Account created successfully!',
                });
                navigate('/login');
            } catch (err) {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    };

    return (
        <section
            style={{backgroundImage: `url(${bg2})`}}
            className="w-full h-screen flex justify-center items-center bg-cover text-primWhite"
        >
            <div className="border border-primWhite rounded-[20px] w-10/12 md:w-9/12 lg:w-[60%] flex flex-col items-center justify-center backdrop-blur-[5px] mt-10">
                <h2 className="text-[1.75em] drop-shadow-custom">Create a new account</h2>
                <form onSubmit={submit} className={`w-10/12`}>
                    {/* Username */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">person</i>
                        </span>
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (e.target.value === '') setUsernameFocus(true);
                            }}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="text"
                            id="username"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setUsernameFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${usernameFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="username"
                        >
                            username
                        </label>
                    </div>

                    {/* First Name */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">badge</i>
                        </span>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="text"
                            id="first-name"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setFirstNameFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${firstNameFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="first-name"
                        >
                            first name
                        </label>
                    </div>

                    {/* Last Name */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">badge</i>
                        </span>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="text"
                            id="last-name"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setLastNameFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${lastNameFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="last-name"
                        >
                            last name
                        </label>
                    </div>

                    {/* Date of Birth */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <input
                            value={dateOfBirth}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="text"
                            id="dateOfBirth"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            onFocus={(e) => {
                                e.target.type = 'date';
                                e.target.click();
                                setDateOfBirthFocus(true);
                            }}
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    e.target.type = 'text';
                                    setDateOfBirthFocus(false);
                                }
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${dateOfBirthFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="dateOfBirth"
                        >
                            date of birth
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                         <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                             <i className="material-icons">email</i>
                        </span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="email"
                            id="email"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setEmailFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${emailFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="email"
                        >
                            email
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">lock</i>
                        </span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="password"
                            id="password"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setPasswordFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${passwordFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="password"
                        >
                            password
                        </label>
                    </div>

                    {/* Re-enter Password */}
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">lock</i>
                        </span>
                        <input
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="password"
                            id="re-password"
                            onFocus={() => setRePasswordFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setRePasswordFocus(false);
                            }}
                        />
                        <label
                            className={`absolute top-[50%] left-1.5 text-xl translate-y-[${rePasswordFocus ? '-2rem' : '-50%'}] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                            htmlFor="re-password"
                        >
                            re-enter password
                        </label>
                    </div>

                    <button type="submit" className="w-full self-center border border-primWhite py-4 text-xl rounded-[10px] hover:scale-[1.03] transition-transform duration-700 ease-in-out">
                        Register
                    </button>
                </form>

                <div className="mt-3.5 mb-5 flex items-center justify-center gap-3">
                    Already have an account?
                    <p onClick={() => navigate('/login')} className="text-primWhite text-xl font-bold cursor-pointer">
                        Login
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
