import React from 'react';
import useAuth from '../hooks/useAuth';
import logoutImage from '../images/logout.svg';

const ProfileNameDropDown = () => {

    const { user, logOut } = useAuth()

    return (
        <div className="dropdown">
            <button style={{ height: '30px', width: '30px', borderRadius: '50%' }} data-bs-toggle="dropdown" aria-expanded="false" className='btn text-white btn-sm bg-danger fw-bold mt-1 mx-auto d-block dropdown-toggle'>{user?.company_name.slice(0, 1)}</button>

            <ul className="dropdown-menu">
                <button onClick={()=> logOut()} className='profile-dropdown-logout-button d-flex justify-content-center align-items-center'><img width={20} className='img-fluid me-2' src={logoutImage} alt="logout" /> Log Out</button>
            </ul>
        </div>
    );
};

export default ProfileNameDropDown;