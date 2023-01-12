import React from 'react';
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const { user } = useAuth();
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        placeOrder(data);
    }

    const placeOrder = data => {

        const orderDetails = {
            ...user,
            products: JSON.parse(localStorage.getItem('shopping-cart')),
            date: data.date
        }

        fetch('https://shwapno.up.railway.app/order', {
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
        <section>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Shipping Details</h1>
                <p>Client Name: <b>{user?.name}</b></p>
                <p>Email: <b>{user?.email}</b></p>
                <p>Password: <b>{user?.password}</b></p>
                <p>Address: <b>{user?.address}</b></p>
                <p>Phone: <b>{user?.phone}</b></p>

                <div className="col-md-4 pb-5">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group mt-2">
                            <label htmlFor="date" className='p-1'>Delivery Date</label>
                            <input min={new Date().toISOString().split('T')[0]} type="date"
                                // defaultValue={userInfo?.date} 
                                className="form-control p-2"
                                {...register("date", { required: true })} />
                            {errors.date && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <input className='btn btn-dark px-3 mt-3' type="submit" value='Order Now' />
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Shipping;