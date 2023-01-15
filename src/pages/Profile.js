import React from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth'

const Profile = () => {

    const { user, logOut } = useAuth();

    return (
        <section>
            <Navbar />
            <h1 className='mt-5 fs-4 text-center'>Profile</h1>

            <div className="container mt-5">
                <h2 className='fs-5'>Welcome <span>{user.email}</span></h2>
                <button onClick={()=> logOut()} className='btn btn-danger px-3 mt-3'>Log out</button>
            </div>
            <CartDetails />
        </section>
    );
};

export default Profile;