import React from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductRequest from '../components/ProductRequest';

const Orders = () => {
    return (
        <section>
            <Navbar />
            <h1 className='mt-5 fs-4 text-center'>Orders</h1>
            <CartDetails />
            <ProductRequest />
        </section>
    );
};

export default Orders;