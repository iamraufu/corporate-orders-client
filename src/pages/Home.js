import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {

    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid row">
                <div style={{padding:'0'}} className="col-lg-2 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-lg-10 col-md-3">
                    <h1 className="text-center fw-bold fs-5 my-3">Swapno Corporate Orders</h1>
                </div>
            </div>
        </section>
    );
};

export default Home;