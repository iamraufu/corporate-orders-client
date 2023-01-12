import React from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductByDivision from '../components/ProductByDivision';
import Sidebar from '../components/Sidebar';
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

                <div style={{padding:'0'}} className="col-lg-10">
                    <div className="d-flex">
                        <div className='col-lg-10 pe-2'>
                            {
                                divisionData.map((item, index) => <ProductByDivision key={index + 1} category={item} />)
                            }
                        </div>

                        <div style={{ boxShadow: '0 5px 5px #c4c4c44d', borderLeft: '1px solid lightgrey' }} className='col-lg-2'>
                            <div style={{ top: '69px', maxHeight: '90vh', overflowY: 'auto' }} className="sticky-top">
                                <CartDetails />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;