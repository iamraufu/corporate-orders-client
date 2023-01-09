import React from 'react';
import { Link } from 'react-router-dom';
import upset from '../images/upset.png';

const NotFound = () => {
    return (
        <div style={{  backgroundColor: '#f8f8f8' }} className='container-fluid d-flex justify-content-center align-items-center'>
            <div className="">
                <img className='img-fluid' src={upset} alt="404" />
                <h1 style={{ fontSize: '80px' }} className='text-center fw-bold text-muted'>404</h1>
                <h2 className='text-center text-muted fw-bold fs-5'>Page Not Found</h2>
                <p className='text-center text-muted'>The page you are looking for doesn't exist or an other error occurred.
                    <br />
                    <span style={{ cursor: 'pointer', }} onClick={() => window.history.back()}>Go back</span>, or head over to <Link to='/' className='text-muted text-decoration-none'>Home</Link> to choose a new direction.
                </p>
                <Link onClick={() => window.scrollTo(0, 0)} to='/' className='text-decoration-none'><button className='mx-auto d-block btn btn-secondary px-5 py-2'>Go Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;