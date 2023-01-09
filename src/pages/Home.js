import React from 'react';
import Navbar from '../components/Navbar';
import ProductByDivision from '../components/ProductByDivision';
import Sidebar from '../components/Sidebar';
import divisionData from '../data/division.json'

const Home = () => {
    
    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid row">
                <div style={{padding:'0'}} className="col-lg-2 col-md-3">
                    <Sidebar />
                </div>

                <div className="col-lg-10 col-md-3">
                    <h1 className="text-center fw-bold fs-5 my-3">Shwapno Corporate Orders</h1>
                    {
                        divisionData.map((item, index) => <ProductByDivision key={index+1} category={item} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;