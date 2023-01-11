import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form";

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const { user, setUser } = useAuth();
    
    user?.email && navigate(from, { replace: true })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processLogin(data);
    const [loginError, setLoginError] = useState('');

    const processLogin = (details) => {
        fetch('https://shwapno.up.railway.app/login', {
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
                    setUser(result.user)
                    setLoginError('')
                    localStorage.setItem('uId', result.user._id)
                }
            }
            )
    }

    return (
        <section>
            <Navbar />
            <h1 className='mt-5 fs-4 text-center'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-4 col-sm-6 mx-auto d-block px-2">

                    <div className="form-group mt-2">
                        <label htmlFor='email' className='p-1'>Email</label>
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

                    {/* <div className="mt-3">
                        <Link to='/reset-password' className='text-black text-decoration-none'>Can't Remember your password? <span className='text-primary text-decoration-underline'>Click here</span></Link>
                    </div> */}

                    <input type="submit" className="btn btn-dark px-5 mt-2" value="Log In" />

                    {/* <button onClick={resetPassword} className='btn btn-outline-dark p-2 ms-2'>Reset Password</button> */}



                    {/* <div className="mt-3">
                        <Link to='/register' className='text-black text-decoration-none'>Don't have an Account? <span className='text-primary text-decoration-underline'>Register as a new user</span></Link>
                    </div> */}
                </div>

            </form>
        </section>
    );
};

export default Login;