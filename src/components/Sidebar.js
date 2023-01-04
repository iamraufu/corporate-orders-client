import React from 'react';
import { NavLink } from 'react-router-dom';
import products from '../data/products.json'
import division from '../data/division.json'

const Sidebar = () => {

    const category = [...new Set(products.map((item) => item.division))];
    console.log(category);

    return (
        <section>
            {
                division.map((item, index) =>
                    <div key={index + 1} className="">
                        <NavLink to={`/${item.route}`} className='pt-3'>{item.name}</NavLink>
                    </div>
                )}
        </section>
    );
};

export default Sidebar;