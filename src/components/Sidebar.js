import React from 'react';
import { NavLink } from 'react-router-dom';
// import products from '../data/products.json'
import division from '../data/division.json'

const Sidebar = () => {

    // const category = [...new Set(products.map((item) => item.division))];
    // console.log(category);

    const activeStyles = {
        color: '#dc3545',
        backgroundColor: '#000',
        borderRadius: '5px'
    }

    const handleClick = () => {
        document.getElementById('categories').style.display = 'block'
    }

    return (
        <section style={{ backgroundColor: '#df0100', boxShadow: '0 5px 5px #c4c4c44d' }} className='bg-white py-1'>
            <h1 onClick={() => handleClick()} className='fs-5 text-center py-2 fw-bold'>Categories</h1>

            <div className="d-md-none">
                <div className="d-flex flex-wrap">
                    {
                        division.map((item, index) =>
                            <NavLink onClick={() => { window.scrollTo(0, 0); }} key={index + 1} to={`/${item.route}`} className='text-black text-decoration-none col-sm-1'>
                                <h2 className='p-2 sidebar-item'>{item.name}</h2>
                            </NavLink>
                        )}
                </div>
            </div>

            <div id='categories' className="d-none d-lg-block">
                {
                    division.map((item, index) =>
                        <NavLink onClick={() => { window.scrollTo(0, 0); }}
                            style={({ isActive }) => (
                                isActive ? activeStyles : undefined
                            )} key={index + 1} to={`/${item.route}`} className='text-black text-decoration-none '>
                            <h2 className='p-2 m-2 sidebar-item'>{item.name}</h2>
                            <div className="line mx-3"></div>
                        </NavLink>
                    )}
            </div>

        </section>
    );
};

export default Sidebar;