import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />
            <Sidebar />
        </section>
    );
};

export default Home;