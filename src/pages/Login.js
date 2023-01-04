import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname ||  "/products" ;

    const { auth, signInWithEmailAndPassword, user, setUser, error, google, github } = useAuth();
    console.log(auth, signInWithEmailAndPassword, user, setUser, error, google, github)
    
    // useEffect(()=>{
        user.email && navigate(from , { replace:true })
        // eslint-disable-next-line
    // },[])

    return (
        <section>
            <Navbar />
            Login
        </section>
    );
};

export default Login;