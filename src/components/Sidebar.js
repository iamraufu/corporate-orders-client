import React from 'react';
import { NavLink } from 'react-router-dom';
// import products from '../data/products.json'
import division from '../data/division.json'

const Sidebar = () => {

    // const category = [...new Set(products.map((item) => item.division))];

    const activeStyles = {
        color: '#dc3545',
        backgroundColor: '#000',
        borderRadius: '5px'
    }

    return (
        <section style={{ boxShadow: '0 5px 5px #c4c4c44d' }} className='py-1'>

            <div className="d-none d-lg-block">
                <h1 style={{fontSize:'14px'}} className='py-2 text-center fw-bold'>Categories</h1>
                {
                    division.map((item, index) =>
                        <NavLink onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )} key={index + 1} to={`/${item.route}`} className='text-black text-decoration-none'>
                            <h2 className='p-2 m-2 sidebar-item'>{item.name}</h2>
                            {/* <div className="line mx-3"></div> */}
                        </NavLink>
                    )}
            </div>

            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title fw-bold ps-3" id="offcanvasWithBackdropLabel">Categories</h5>
                    <button type="button" className="btn-close text-reset btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {
                        division.map((item, index) =>
                            // <a onClick={() => { window.scrollTo(0, 0); }}
                            //     key={index + 1} href={`/${item.route}`} className='text-black text-decoration-none '>
                            //     <h2 className='p-2 m-2 sidebar-item'>{item.name}</h2>
                            // </a>
                            <NavLink onClick={() => { window.scrollTo(0, 0); }}
                                style={({ isActive }) => (
                                    isActive ? activeStyles : undefined
                                )} key={index + 1} to={`/${item.route}`} className='text-black text-decoration-none '>
                                <h2 className='p-2 m-2 sidebar-item'>{item.name}</h2>
                                <div className="line mx-3"></div>
                            </NavLink>
                        )}
                </div>
            </div>

        </section>
    );
};

export default Sidebar;