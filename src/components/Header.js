import React from 'react';
import useAuth from '../hooks/useAuth';
import logout from '../images/logout2.svg'

const Header = () => {

    const { credential } = useAuth()
    const {user, logOut} = credential

    return (
        <div className='py-3'>
            <div className="d-none d-lg-block">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className='fs-4 fw-bold'>{user?.name}</h1>
                    <div style={{ cursor: 'pointer' }} onClick={() => logOut()} className="fs-4 fw-bold">
                        Logout <img className='ms-3 img-fluid' src={logout} alt="logout" />
                    </div>
                </div>
            </div>

            <div className="px-2 d-lg-none">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                        <h1 className='fs-6 fw-bold'>{user?.name}</h1>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => logOut()} className="fs-6 fw-bold">
                        Logout <img width={20} className='ms-3 mb-1 img-fluid' src={logout} alt="logout" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;