import React, {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from './appLayout/AppLayout.jsx';
import Loader from "./components/loader/Loader.jsx";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes.jsx";

const Home = lazy(() => import('./pages/home/Home.jsx'));
const Login = lazy(() => import('./pages/login/Login.jsx'));
const Register = lazy(() => import('./pages/register/Register.jsx'));
const NotFound = lazy(() => import('./pages/notFound/NotFound.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            { index: true, element: <PrivateRoutes><Home /></PrivateRoutes> },
            // {index: true, element: <Home/>},
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
            {path: '*', element: <NotFound/>}
        ]
    }
]);

function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    );
}

export default App;
