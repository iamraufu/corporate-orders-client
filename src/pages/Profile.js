import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductRequest from '../components/ProductRequest';
import Sidebar from '../components/Sidebar';
import VegCart from '../components/VegCart';
import useAuth from '../hooks/useAuth'
import down from '../images/down.svg'

const Profile = () => {

    const { credential } = useAuth();

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://corporate-orders-server.onrender.com/orders/ordersById/${credential.user._id}`)
            .then(response => response.json())
            .then(data => setOrders(data.result))
    }, [credential.user._id])

    const handleClick = () => {
        document.getElementById('update_form').style.display === 'none' ?
            document.getElementById('update_form').style.display = 'block' :
            document.getElementById('update_form').style.display = 'none'
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch(`https://corporate-orders-server.onrender.com/user/${credential.user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                data.status === true ?
                    Swal.fire({
                        icon: 'success',
                        text: `${data.message}`,
                    }) :
                    Swal.fire({
                        icon: 'error',
                        text: `${data.message}`,
                    })
            }).catch(err => Swal.fire({
                icon: 'error',
                text: `${err}!`,
            }))
        document.getElementById('update_form').style.display = 'none';
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }


    return (
        <section className='container-fluid p-0'>
            <Navbar />
            <div className="d-md-none"><Sidebar /></div>

            <div className="row">
                <VegCart />
            </div>

            <h1 className='mt-5 fs-4 text-center'>Profile</h1>

            <div className="container mt-5">

                <h2 style={{ 
                    // cursor: 'pointer', 
                    maxWidth: '500px' }} 
                    // data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" 
                    className='fs-5 fw-bold d-flex justify-content-between align-items-center'>Business Profile 
                {/* <img src={down} alt="click for details" /> */}
                </h2>

                <div 
                // id="multiCollapseExample1" 
                style={{
                    backgroundColor: '#FFF7E1', maxWidth: '500px',
                    // height: '170px' 
                    // collapse multi-collapse
                }} className="py-5 ps-5">
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className=''><span>{credential.user.company_name}</span></h2>

                    {/* <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>Total <span style={{ color: '#F97D48' }}>{orders.map(order => order.products.reduce((a, b) => a + b.price * b.count, 0)).reduce((a, b) => a + b, 0)}</span> Tk Transaction</h3> */}

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>Total <span style={{ color: '#F97D48' }}>{orders.length}</span> Orders</h4>
                </div>

                <div style={{ maxWidth: '500px' }} className="d-flex justify-content-between align-items-center pt-5">
                    <div style={{ cursor: 'pointer' }} data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-controls="multiCollapseExample2"><h2 className='fs-5 fw-bold'>Personal Profile <img className='' src={down} alt="click for details" /></h2></div>
                    {/* <div type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-controls="multiCollapseExample2" className=""><img className='pb-2' src={down} alt="click for details" /></div> */}
                    <div onClick={() => handleClick(credential.user._id)} style={{ cursor: 'pointer', color: '#F1833E', fontSize: '20px', fontWeight: '600' }} className="pb-2">Edit</div>
                </div>

                <div id="multiCollapseExample2" style={{
                    backgroundColor: '#E9F9E8', maxWidth: '500px',
                    // height: '170px' 
                }} className="py-5 ps-5 collapse multi-collapse">
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className=''>Primary Client Name : {credential.user?.primary_client_name}</h2>

                    <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{credential.user?.primary_client_number}</h3>

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{credential.user?.primary_client_email}</h4>

                    <h2 style={{ fontSize: '18px', fontWeight: '600' }} className='mt-5'>Secondary Client Name : {credential.user?.secondary_client_name}</h2>

                    <h3 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{credential.user?.secondary_client_number}</h3>

                    <h4 style={{ fontSize: '18px', fontWeight: '600' }} className='fs-6 pt-2'>{credential.user?.secondary_client_email}</h4>
                </div>

                {
                    credential.user?.email && <div id='update_form' style={{ display: 'none', maxWidth: '500px' }} className="p-3 mt-3">

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group mt-2">
                                <input type="text" placeholder='Company Name' defaultValue={credential.user?.company_name} className="form-control p-2" {...register("company_name")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="text" placeholder='Company Address' defaultValue={credential.user?.address} className="form-control p-2" {...register("address")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="email" placeholder='Email' defaultValue={credential.user?.email} className="form-control p-2" {...register("email")} disabled />
                            </div>

                            <div className="form-group mt-2">
                                <input type="phone" placeholder='Phone' defaultValue={credential.user?.phone} className="form-control p-2" {...register("phone")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="text" placeholder='Primary Client Name'
                                    defaultValue={credential.user?.primary_client_name} 
                                    className="form-control p-2" {...register("primary_client_name")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="phone" placeholder='Primary Client Number'
                                    defaultValue={credential.user?.primary_client_number} 
                                    className="form-control p-2" {...register("primary_client_number")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="email" placeholder='Primary Client Email Address'
                                    defaultValue={credential.user?.primary_client_email} 
                                    className="form-control p-2" {...register("primary_client_email")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="text" placeholder='Secondary Client Name'
                                    defaultValue={credential.user?.secondary_client_name} 
                                    className="form-control p-2" {...register("secondary_client_name")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="phone" placeholder='Secondary Client Number'
                                    defaultValue={credential.user?.secondary_client_number} 
                                    className="form-control p-2" {...register("secondary_client_number")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="email" placeholder='Secondary Client Email Address'
                                    defaultValue={credential.user?.secondary_client_email} 
                                    className="form-control p-2" {...register("secondary_client_email")} />
                            </div>

                            <div className="form-group mt-2">
                                <input type="password" placeholder='Password'
                                    defaultValue={credential.user?.password} 
                                    className="form-control p-2" {...register("password")} />
                            </div>

                            <input className='btn btn-dark p-2 mt-2 mx-auto d-block' type="submit" value='Submit' />
                        </form>
                    </div>
                }
            </div>
            <CartDetails />
            <ProductRequest />
        </section>
    );
};

export default Profile;