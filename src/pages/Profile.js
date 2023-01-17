import React, { useEffect, useState } from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductRequest from '../components/ProductRequest';
import useAuth from '../hooks/useAuth'
import down from '../images/down.svg'

const Profile = () => {

    const { user, logOut } = useAuth();
    console.log(logOut);

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://shwapno.up.railway.app/orders/ordersById/${user._id}`)
            .then(response => response.json())
            .then(data => setOrders(data.result))
    }, [user._id])

    console.log(orders);

    return (
        <section>
            <Navbar />
            <h1 className='mt-5 fs-4 text-center'>Profile</h1>

            <div className="container mt-5">

                <h2 style={{ cursor: 'pointer' }} data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" className='fs-5 fw-bold'>Business Profile <img src={down} alt="click for details" /></h2>

                <div id="multiCollapseExample1" style={{
                    backgroundColor: '#FFF7E1', maxWidth: '500px',
                    // height: '170px' 
                }} className="py-5 ps-5 collapse multi-collapse">
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className=''><span>{user.company_name}</span></h2>

                    <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>Total <span style={{ color: '#F97D48' }}>{orders.map(order => order.products.reduce((a, b) => a + b.price * b.count, 0)).reduce((a, b) => a + b, 0)}</span> Tk Transaction</h3>

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>Total <span style={{ color: '#F97D48' }}>{orders.length}</span> Orders</h4>
                </div>

                <h2 style={{ cursor: 'pointer' }} type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-controls="multiCollapseExample2" className='fs-5 fw-bold mt-5 pt-5'>Personal Profile <img src={down} alt="click for details" /></h2>

                <div id="multiCollapseExample2" style={{
                    backgroundColor: '#E9F9E8', maxWidth: '500px',
                    // height: '170px' 
                }} className="py-5 ps-5 collapse multi-collapse">
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className=''>Primary Client Name : {user?.primary_client_name}</h2>

                    <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{user?.primary_client_number}</h3>

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{user?.primary_client_email}</h4>

                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className='mt-5'>Secondary Client Name : {user?.secondary_client_name}</h2>

                    <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{user?.secondary_client_number}</h3>

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{user?.secondary_client_email}</h4>
                </div>



                {/* <button onClick={()=> logOut()} className='btn btn-danger px-3 mt-3'>Log out</button> */}

                {/* {
                    orders.length > 0 ?
                        orders.map((order, index) =>
                            <div className="">
                                {order.products.map(product =>
                                    <>
                                    
                                    <li>{product?.name} - {product?.count} {product.price*product.count}</li>
                                    
                                    </>
                                )}
                            </div>)
                        :
                        <p>Loading...</p>
                } */}

            </div>
            <CartDetails />
            <ProductRequest />
        </section>
    );
};

export default Profile;