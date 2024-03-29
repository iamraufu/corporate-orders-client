import React from 'react';
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import ProductRequest from '../components/ProductRequest';
import CartDetails from '../components/CartDetails';
import VegCart from '../components/VegCart';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const navigate = useNavigate()

    const { credential, setRequestedProduct, setCart } = useAuth();
    const user = credential.user

    const { register, handleSubmit, formState: { errors } } = useForm();

    const requestedProducts = JSON.parse(localStorage.getItem('requested-product')) || []

    const onSubmit = data => {
        document.getElementById('order_now').style.display = 'none'
        document.getElementById('processing').style.display = 'block'
        placeOrder(data);
    }

    const placeOrder = data => {

        const orderDetails = {
            user,
            uId: user._id,
            email: user.email,
            client_id: user.client_id,
            company: user.name,
            phone: user.phone,
            products: JSON.parse(localStorage.getItem('shopping-cart')),
            requested_products: requestedProducts,
            date: data.date,
            status: 'Pending'
        }

        fetch('https://corporate-orders-server.onrender.com/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Congratulations!',
                        text: `${data.message}`,
                    })
                    localStorage.removeItem('cart');
                    localStorage.removeItem('shopping-cart');
                    localStorage.removeItem('requested-product');
                    setRequestedProduct([])
                    setCart([])
                    navigate('/orders')
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Something went wrong',
                        text: 'We can not Process your order due to high demand. Please try again later',
                    })
                }
            })
    }

    return (
        <section className='container-fluid p-0'>
            <Navbar />

            <div className="row">
                <VegCart />
            </div>

            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Shipping Details</h1>
                <p>Client Name: <b>{user?.company_name}</b></p>
                <p>Email: <b>{user?.email}</b></p>
                {/* <p>Password: <b>{user?.password}</b></p> */}
                <p>Address: <b>{user?.address}</b></p>
                <p>Phone: <b>{user?.phone}</b></p>

                <div className="col-md-4 pb-5">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group mt-2">
                            <div className="">
                                <label htmlFor="date" className='p-1'>Delivery Date</label>
                                <input id='date' min={new Date().toISOString().split('T')[0]} type="date" name='date' className="form-control p-2"
                                    {...register("date", { required: true })} />
                                {errors.date && <span className='text-danger'>Date is required</span>}
                            </div>
                        </div>

                        <input id='order_now' className='btn btn-dark px-3 mt-3' type="submit" value='Order Now' />
                    </form>

                    <button style={{ display: 'none' }} id='processing' className='btn btn-dark px-3 mt-3' disabled> <div style={{ height: '15px', width: '15px' }} className="spinner-border me-1"></div>Processing...</button>
                </div>
            </div>
            <ProductRequest />
            <CartDetails />
        </section>
    );
};

export default Shipping;