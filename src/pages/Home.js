import React from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductByDivision from '../components/ProductByDivision';
import Sidebar from '../components/Sidebar';
import VegCart from '../components/VegCart';
import divisionData from '../data/division.json'

const Home = () => {
    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid row">
                <div style={{ padding: '0' }} className="col-lg-2">
                    <div style={{ top: '70px' }} className="sticky-top">
                        <Sidebar />
                    </div>
                </div>

                <div className="col-lg-10">
                    {
                        divisionData.map((item, index) => <ProductByDivision key={index + 1} category={item} />)
                    }
                </div>
                <VegCart />
                <CartDetails />
            </div>
        </section>
    );
};

export default Home;