import React, { useEffect, useState } from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductRequest from '../components/ProductRequest';
import tickImage from '../images/tick.svg'

const Orders = () => {

    const uId = localStorage.getItem('uId')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://shwapno.up.railway.app/orders/ordersById/${uId}`)
            .then(response => response.json())
            .then(data => setOrders(data.result))
    }, [uId])

    const thisMonthOrders = orders.filter(order => order.date.slice(5, 7) === new Date().toISOString().slice(5, 7))

    // console.log(orders)

    const handleAddAllToCart = (products) => {
        // console.log(products)
        let cart = {}
        products.forEach(product => {
            cart[product.code] = product.count;
            // localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
        })
    }

    return (
        <section>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Order History</h1>
                <h2 style={{ color: '#8A92A6' }} className='fs-6 ps-2'><img src={tickImage} alt="total order this month" /> {thisMonthOrders.length} Total Orders This Month</h2>

                <div className="d-flex pb-3 justify-content-between align-items-center p-2">
                    <div className="col-md-4"><h2 style={{color:'#655D5D'}} className="fs-6 fw-bold">Date</h2></div>
                    <div className="col-md-4"><h2 style={{color:'#655D5D'}} className="fs-6 fw-bold">Order</h2></div>
                    <div className="col-md-4"><h2 style={{color:'#655D5D'}} className="fs-6 fw-bold">Status</h2></div>
                </div>
                {
                    orders.length > 0 &&
                    orders.map(order =>
                        <div style={{backgroundColor:'#FCFCFC'}} className="d-flex justify-content-between align-items-center p-2">
                            <div className="col-md-4"><p style={{ fontSize: '18px' }} className='text-black'>{order.date}</p></div>
                            <div className="col-md-4"><p style={{color:'#232D42'}} className='fs-6'>Tk {order.products.reduce((a, b) => a + b.price * b.count, 0)}</p></div>
                            <div className="col-md-4"><button onClick={()=> handleAddAllToCart(order.products)} className='btn-add-add-items-to-bag mb-3'>Add all items to bag</button></div>
                        </div>
                    )
                }
            </div>
            <CartDetails />
            <ProductRequest />
        </section>
    );
};

export default Orders;