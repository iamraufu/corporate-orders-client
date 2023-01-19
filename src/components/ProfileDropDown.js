import React from 'react';
import '../styles/ProfileDropDown.css'
import logoutImage from '../images/logout.svg';
import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

const ProfileDropDown = () => {

    const {user, logOut} = useAuth();
    // const navigate = useNavigate();

    return (
        <div
        className='profile-image me-3' 
        // style={{ height: '40px', width: '40px', borderRadius: '50%', backgroundColor: 'lightgrey', cursor: 'pointer' }}
        >
            <button style={{ height: '30px', width: '30px', borderRadius: '50%' }} className='btn text-white btn-sm bg-danger fw-bold mt-1 mx-auto d-block'>{user?.company_name.slice(0, 1)}</button>
            {/* <img style={{ borderRadius: '50%' }} width={40} className='img-fluid mx-auto d-block profile-image' src='https://avatars.githubusercontent.com/u/43452776?v=4' alt="user" /> */}

            {/* Custom Dropdown */}
            <div id='profile-dropdown'>
                {/* Profile Data from API */}
                {/* <img style={{ borderRadius: '50%' }} width={80} className='img-fluid mx-auto d-block py-3' src={user.image || 'https://avatars.githubusercontent.com/u/43452776?v=4'} alt="user" /> */}
                <button style={{ height: '60px', width: '60px', borderRadius: '50%' }} className='btn text-white btn-sm bg-danger fw-bold mt-1 mx-auto d-block fs-4'>{user?.company_name.slice(0, 1)}</button>
                <h2 className='fs-6 text-center px-1 pt-2'>{user?.company_name}</h2>
                <h2 className='fs-6 text-center'><small>{user?.email}</small></h2>
                <h2 className='fs-6 text-center'><small>{user?.phone}</small></h2>
                {/* <button onClick={()=> navigate('/profile')} className='profile-dropdown-button'>See Profile</button> */}
                {/* <button onClick={()=> navigate('/orders')} className='profile-dropdown-button'>Order History</button> */}

                <div style={{ borderBottom: '1px solid #efefef' }} className="mx-4"></div>

                <button onClick={()=> logOut()} className='profile-dropdown-logout-button d-flex justify-content-center align-items-center'><img width={20} className='img-fluid me-2' src={logoutImage} alt="logout" /> Log Out</button>
            </div>

        </div>
    );
};

export default ProfileDropDown;