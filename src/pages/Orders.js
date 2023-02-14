import React, { useEffect, useState } from 'react';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductRequest from '../components/ProductRequest';
import tickImage from '../images/tick.svg'
import down from '../images/down.svg'
import Sidebar from '../components/Sidebar';
import VegCart from '../components/VegCart';
import WhatsApp from '../components/WhatsApp';
import useAuth from '../hooks/useAuth';

const Orders = () => {

    const { addCartProductsToDB,
        // setRequestedProduct 
    }
        = useAuth();

    const uId = localStorage.getItem('uId')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://corporateorders.herokuapp.com/orders/ordersById/${uId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.result)
                setOrders(data.result.reverse())
            })
    }, [uId])

    const thisMonthOrders = orders.filter(order => order.date.slice(5, 7) === new Date().toISOString().slice(5, 7))

    const handleAddAllToCart = (order) => {
        let cart = {}
        order.products.forEach(product => {
            cart[product.code] = product.count;
            localStorage.setItem('cart', JSON.stringify(cart));
        })
        addCartProductsToDB(order.products)
        // setRequestedProduct(order.requested_products)
        // localStorage.setItem('shopping-cart', JSON.stringify('shopping-cart'));
        document.getElementById('view_cart').click()
    }

    const handleClick = (id) => {
        document.getElementById(`product-${id}`).style.display === 'none' ?
            document.getElementById(`product-${id}`).style.display = 'block' :
            document.getElementById(`product-${id}`).style.display = 'none'
    }

    return (
        <section style={{ minHeight: '100vh' }} className='container-fluid p-0'>
            <Navbar />
            <div className="d-md-none"><Sidebar /></div>

            <div className="row">
                <VegCart />
            </div>

            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Order History</h1>
                <h2 style={{ color: '#8A92A6' }} className='fs-6 ps-2'><img src={tickImage} alt="total order this month" /> {thisMonthOrders.length} Total Orders This Month</h2>

                <div className="d-flex justify-content-between align-items-center pb-3 p-2">
                    <div className="col-md-3"><h2 style={{ color: '#655D5D' }} className="fs-6 fw-bold">Date</h2></div>
                    <div className="col-md-4"><h2 style={{ color: '#655D5D' }} className="fs-6 fw-bold px-5">Status</h2></div>
                    <div className="col-md-2"></div>
                </div>
                {
                    orders.length > 0 &&
                    orders.map((order, index) =>
                        <div onClick={() => handleClick(index + 1)} key={order._id} style={{ backgroundColor: '#FCFCFC', cursor: 'pointer' }} className="">
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="col-md-3">
                                    <p style={{ fontSize: '18px' }} className='text-black'>{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="col-md-4">
                                    <button onClick={() => handleAddAllToCart(order)} className='btn-add-add-items-to-bag mb-3'>Add all items to bag</button>
                                </div>

                                <div className="col-md-2 ps-3">
                                    <img className='img-fluid mb-3 mx-auto d-block' src={down} alt="click for details" />
                                </div>
                            </div>

                            <div style={{ display: 'none' }} id={`product-${index + 1}`} className="py-2">
                                <div style={{ backgroundColor: '#ebebeb' }} className="d-flex justify-content-between align-items-center p-2">
                                    <div className="col-md-3 fw-bold">Name</div>
                                    <div className="col-md-3 fw-bold text-center">Quantity</div>
                                </div>

                                {order.products.map(product =>
                                    <div key={product._id} style={{ backgroundColor: '#ececec' }} className="d-flex justify-content-between align-items-center px-2 pb-2">
                                        <div className="col-md-3"><small>{product.name}</small></div>
                                        <div className="col-md-3 text-center"><small>{product.count}</small></div>

                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
            <CartDetails />
            <ProductRequest />
            <WhatsApp />
        </section>
    );
};

export default Orders;