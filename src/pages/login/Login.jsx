import  {useState} from 'react';
import bg2 from '../../assets/bg2.jpg'
import axiosInstance from "../../axiosConfig/axiosConfig.js";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate()
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const submit =async (e) => {
        e.preventDefault();
        await axiosInstance.post('/users/login',{
           identifier:identifier,
           password:password
           }).then((res)=>{
               swal.fire({
                     title: 'Success',
                     text: 'Welcome Back',
                     icon: 'success',
                     confirmButtonText: 'Go Home page',
                   allowOutsideClick: false
               }).then(res=>{
                   if(res.isConfirmed){
                       navigate('/')
                   }
               })
            rememberMe ? localStorage.setItem('token',res.data.token) : sessionStorage.setItem('token',res.data.token)
           }).catch((err)=>{
               swal.fire({
                     title: 'Error',
                     text: err.response.data.message,
                     icon: 'error',
                     confirmButtonText: 'Try Again',
                     allowOutsideClick: false
               })
           })
    }

    return (
        <section style={{backgroundImage: `url(${bg2})`}} className="w-full h-screen flex justify-center items-center bg-cover text-primWhite">
            <div className="border botext-primWhite rounded-[20px] w-10/12 md:w-9/12 lg:w-[50%] flex flex-col items-center justify-evenly backdrop-blur-[5px] h-[30rem]">
                <h2 className="text-[1.75em] drop-shadow-custom">Login with your account</h2>
                <form className={`flex flex-col w-10/12`} autoComplete={`off`} onSubmit={submit}>
                    <div className="relative border-b-2 border-primWhite w-full my-8">
                        <span className="absolute right-2 top-[23%] text-[1.4em] leading-10">
                            <i className="material-icons">email</i>
                        </span>
                        <input
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setEmailFocus(false)
                            }}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="text"
                            id="email"
                        />
                        <label className={`absolute top-[50%] left-1.5 ${emailFocus ? 'translate-y-[-2rem]' : 'translate-y-[-50%]'} transition-all duration-200 ease-in-out pointer-events-none text-[1em]`} htmlFor="email">
                            username or email
                        </label>
                    </div>
                    <div className="relative border-b-2 botext-primWhite w-full">
                        <span className="absolute right-2 top-[23%] text-[1.4em]">
                            <i className="material-icons">lock</i>
                        </span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={(e) => {
                                if (e.target.value === '') setPasswordFocus(false)
                            }}
                            className="bg-transparent border-none w-full h-12 text-[1em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                            required
                            type="password"
                            id="password"
                        />
                        <label className={`absolute top-[50%] left-1.5 ${passwordFocus ? 'translate-y-[-2rem]' : 'translate-y-[-50%]'}  transition-all duration-200 ease-in-out pointer-events-none text-[1em]`} htmlFor="password">
                            password
                        </label>
                    </div>

                    <div className="flex items-center justify-between my-5">
                        <label>
                            <input onChange={()=>setRememberMe(!rememberMe)} type="checkbox"/> remember me
                        </label>
                    </div>

                    <button type="submit" className={`w-full self-center border border-primWhite py-4 rounded-[10px] text-xl hover:scale-[1.03] transition-transform duration-700 ease-in-out`}>login</button>
                </form>

                <div className="mt-3.5 flex items-center justify-center gap-1">
                    Don&apos;t have an account?&nbsp;
                    <p className={`text-primWhite text-xl font-bold cursor-pointer`} onClick={()=>navigate('/register')}>create one now</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
