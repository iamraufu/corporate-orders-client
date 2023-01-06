import React from 'react';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
// import Sidebar from '../components/Sidebar';

const Home = () => {

    const { user } = useAuth()

    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />
            <h1 className='mt-5 fs-4 text-center'>Homepage</h1>
            
            <div className="container mt-5">
                <h2>Welcome {user?.email}</h2>
            </div>
            {/* <Sidebar /> */}
        </section>
    );
};

export default Home;