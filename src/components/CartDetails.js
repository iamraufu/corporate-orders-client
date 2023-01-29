import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getStoredCart } from '../utilities/localDB';
import vegCartImage from '../images/veg_cart.png';
import CartProducts from './CartProducts';
// import plusImage from '../images/plus.svg';
// import minusImage from '../images/minus.svg';

const CartDetails = () => {

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    // eslint-disable-next-line
    const [product, setProduct] = useState({});

    // Cart data 
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)

    const requestedProducts = JSON.parse(localStorage.getItem('requested-product')) || []

    // let cart = []

    useEffect(() => {
        fetch('https://shwapno.up.railway.app/productsByCodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                let tempCart = []
                for (let key in savedCart) {
                    tempCart.push({ ...data.find(pd => pd.code === key), count: savedCart[key] })
                }
                setCartItems(tempCart)
                localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
            })
    }, [productKeys, savedCart])

    useEffect(() => {
        if (cartItems.length + requestedProducts?.length > 0) {
            setDisabled(false);
            // document.getElementById('btn_checkout').style.cursor = 'pointer';
            // document.getElementById('btn_checkout').className = 'btn btn-dark mx-auto d-block p-2';
            // document.getElementById('btn_checkout_sm').className = 'btn btn-dark mx-auto d-block p-2';
        }
        else {
            setDisabled(true);
        }
    }, [cartItems.length, requestedProducts?.length])

    const handleClick = () => {
        if (cartItems.length + requestedProducts?.length > 0) {
            navigate('/shipping');
        }
        else {
            Swal.fire(
                'Error!',
                'Your Cart is Empty!',
                'error'
            )
        }
    }

    // eslint-disable-next-line
    // const [cartItemsProducts, setCartItemsProducts] = useState([]);

    // setCartProduct(localCartItems.filter(pd => pd?.code === product?.code))
    // useEffect(()=>{
    //     setCartProduct(localCartItems.filter(pd => pd?.code === product?.code))
    // },[localCartItems,product?.code])
    // const [cartProduct, setCartProduct] = useState(JSON.parse(localStorage.getItem('shopping-cart')).filter(pd => pd?.code === product?.code))






    return (
        <div className="offcanvas offcanvas-end p-0" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div style={{ paddingBottom: '0' }} className="offcanvas-header">
                <h5 id="offcanvasRightLabel" className='fw-bold text-center fs-6'><img width={30} src={vegCartImage} alt="cart details" className='img-fluid pb-3 me-1' /> Total Order
                    {/* <br />
                        <span style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Sub Total: {cartItems.reduce((a, b) => { return a + (b.count); }, 0)} Item(s)</span>
                        <br />
                        <span style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Grand Price: ৳ {cartItems.reduce((a, b) => a + b.price * b.count, 0)}</span> */}
                </h5>
                <button type="button" className="btn-close text-reset mb-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div style={{ padding: '0' }} className="offcanvas-body">
                <div style={{ marginBottom: '8rem' }} className="">
                    {
                        cartItems.map(product =>
                            <CartProducts key={product._id} product={product} />
                            // Eikhan theke
                            // <div key={product._id} style={{ borderBottom: '1px solid #E4DADA' }} className="py-2">
                            //     <div className="d-flex justify-content-between align-item-center px-2">
                            //         <div onClick={() => addToCart(product)} style={{ width: '18px', height: '18px', backgroundColor: '#D9D9D9', cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">+</div>
                            //         <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className="">{product.name}</h2></div>
                            //         <div onClick={() => handleFive(product)} style={{ fontSize: '10px', height: '28px', width: '28px', backgroundColor: '#D9D9D9', borderRadius: '50%', cursor: 'pointer' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">5Kg</div>
                            //         <div onClick={() => handleTen(product)} style={{ fontSize: '10px', height: '28px', width: '28px', backgroundColor: '#D9D9D9', borderRadius: '50%', cursor: 'pointer' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">10Kg</div>
                            //     </div>

                            //     <div className="d-flex justify-content-between align-item-center px-2 mt-2">
                            //         <div onClick={() => handleRemove(product)} style={{ width: '18px', height: '18px', backgroundColor: '#D9D9D9', cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">-</div>
                            //         <div className="col-md-6"></div>
                            //         {/* <div className="col-md-2"><h4 style={{ fontSize: '15px' }} className="fw-bold float-end">{product.price} Tk</h4></div> */}
                            //         <div className="col-md-2"><h4 style={{ fontSize: '15px' }} className="float-end">{product?.count} Kg</h4></div>
                            //     </div>
                            // </div>
                            // Eituk

                            // <div key={product._id} style={{ width: '180px', height: 'auto' }} className="mx-auto d-block mt-3">

                            //     <div style={{ border: '1px solid rgba(120, 58, 58, 0.38)' }} className='py-2'>
                            //         <img width={90} className='img-fluid mx-auto d-block rounded' src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} alt={product.name} />
                            //         <h4 style={{ fontSize: '15px' }} className="fw-bold text-center mt-2">{product.price} Tk</h4>
                            //         <h3 style={{ fontSize: '13px' }} className="fw-bold text-center">{product.name}</h3>

                            //         <div className="d-flex justify-content-around align-items-center pt-2">
                            //             <button className='btn-ft' onClick={() => handleFive(product)}>5</button>
                            //             <button className='btn-ft' onClick={() => handleTen(product)}>10</button>
                            //             <div className="d-flex bg-pm">
                            //                 <div style={{ cursor: 'pointer' }} onClick={() => addToCart(product)} className="px-2"><img className='img-fluid' src={plusImage} alt="add to cart" /></div>
                            //                 <div className="vr my-1"></div>
                            //                 <div style={{ cursor: 'pointer' }} onClick={() => handleRemove(product)} className="px-2"><img className='img-fluid' src={minusImage} alt="remove from cart" /></div>
                            //             </div>
                            //         </div>
                            //     </div>

                            //     <div className="d-flex justify-content-between align-items-center px-1 mt-2">
                            //         <div className="fw-bold">{product?.count} Kg</div>
                            //         <div className="fw-bold">{product?.count * product.price} Tk</div>
                            //     </div>
                            // </div>
                        )
                    }

                    {
                        requestedProducts.length > 0 &&
                        <div className="">
                            <h2 style={{ fontSize: '13px' }} className='fw-bold ps-2 pt-2'>Requested Products</h2>
                            {
                                requestedProducts.map((product, index) =>
                                    <div style={{ borderBottom: '1px solid #E4DADA' }} key={index} className="ps-2 py-1">
                                        <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className="">{product.description}</h2></div>
                                        <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className=""><small>{product.brand}</small></h2></div>
                                        <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className=""><small>{product.quantity} {product.unit}</small></h2></div>
                                    </div>
                                )}
                        </div>
                    }
                </div>

                <div style={{ boxShadow: '0 5px 15px #c4c4c44d', bottom: '0', backgroundColor: '#F9E3E3' }} onClick={() => handleClick()} className="position-absolute mx-auto d-block w-100 p-2">
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <div className="">
                            {
                                cartItems.length + requestedProducts?.length === 0 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>No Product</h5>
                            }

                            {
                                cartItems.length + requestedProducts?.length === 1 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>1 Product</h5>
                            }
                            {
                                cartItems.length + requestedProducts?.length > 1 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>{cartItems.length + requestedProducts?.length} Products</h5>
                            }
                        </div>
                        {/* <div className=""><h5 style={{ fontSize: '14px' }} className='text-center fw-bold'>{cartItems.reduce((a, b) => a + b.price * b.count, 0)} Taka</h5></div> */}
                    </div>
                    {/* <button disabled={disabled} className='btn-confirm-order mx-auto d-block px-5 w-100 fw-bold'>Confirm Order</button> */}
                    <button disabled={disabled} className='float-end btn-confirm-order'>Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;