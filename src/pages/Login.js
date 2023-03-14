import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form";
import loginImage from '../images/login.svg'
import ProductRequest from '../components/ProductRequest';
import CartDetails from '../components/CartDetails';
import Sidebar from '../components/Sidebar';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const { credential } = useAuth();

    credential.user?.email && navigate(from, { replace: true })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processLogin(data);
    const [loginError, setLoginError] = useState('');

    const processLogin = (details) => {
        fetch('https://corporate-orders-server.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === false) {
                    setLoginError(result.message)
                }
                else {
                    credential.setUser(result.user)
                    setLoginError('')
                    localStorage.setItem('uId', result.user._id)
                }
            }
            )
    }

    return (
        <section>
            <Navbar />
            <div className="d-md-none"><Sidebar /></div>
            <h1 style={{ color: '#C0611C' }} className='mt-5 fs-4 text-center'>Login to View your Profile</h1>

            <div style={{ minHeight: '300px', margin:'0' }} className="row justify-content-center align-items-center">
                
                <div className="col-md-6 d-none d-md-block">
                    <img width={300} className='img-fluid mx-auto d-block pt-5' src={loginImage} alt="login" />
                </div>
                
                <div className="col-lg-3 col-md-4 px-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor='email' className='p-1'>Email or Phone</label>
                                <input type='text' className="form-control p-2" {...register("email", { required: true })} />
                                {errors.email && <span className='text-danger'>This field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor='password' className='p-1'>Password</label>
                                <input type='password' className="form-control p-2"{...register("password", { required: true })} />
                                {errors.password && <span className='text-danger'>This field is required</span>}
                            </div>

                            <p><small className="form-text text-muted">We'll never share your information with anyone else.</small></p>
                            <p className='text-danger fw-bold'>{loginError}</p>
                            <input type="submit" className="btn btn-dark px-5 mt-2" value="Log In" />
                    </form>
                </div>
            </div>
            <ProductRequest />
            <CartDetails />

        </section>
    );
};

export default Login;