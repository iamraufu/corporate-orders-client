import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getStoredCart, addToDB, removeFromCart, addFive, addTen } from '../utilities/localDB';
import vegCartImage from '../images/veg_cart.png';
import plusImage from '../images/plus.svg';
import minusImage from '../images/minus.svg';

const CartDetails = () => {

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    // eslint-disable-next-line
    const [product, setProduct] = useState({});

    // Cart data 
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)

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
        if (cartItems.length > 0) {
            setDisabled(false);
            // document.getElementById('btn_checkout').style.cursor = 'pointer';
            // document.getElementById('btn_checkout').className = 'btn btn-dark mx-auto d-block p-2';
            // document.getElementById('btn_checkout_sm').className = 'btn btn-dark mx-auto d-block p-2';
        }
        else {
            setDisabled(true);
        }
    }, [cartItems.length])

    const handleClick = () => {
        if (cartItems.length > 0) {
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
    const [cartProduct, setCartProduct] = useState([])
    // setCartProduct(localCartItems.filter(pd => pd?.code === product?.code))
    // useEffect(()=>{
    //     setCartProduct(localCartItems.filter(pd => pd?.code === product?.code))
    // },[localCartItems,product?.code])
    // const [cartProduct, setCartProduct] = useState(JSON.parse(localStorage.getItem('shopping-cart')).filter(pd => pd?.code === product?.code))
    const [cartProductCount, setCartProductCount] = useState(cartProduct.length)
    const shoppingList = JSON.parse(localStorage.getItem('shopping-cart'));

    useEffect(() => {
        setCartProduct(shoppingList.filter(pd => pd?.code === product?.code))
        // eslint-disable-next-line
    }, [product.code])

    useEffect(() => {
        setCartProductCount(cartProduct[0]?.count)
    }, [cartProduct])

    const addToCart = (product) => {
        setCartProductCount(cartProductCount + 1)
        shoppingCart(product);
    }

    const handleRemove = (product) => {
        cartProductCount === 1 ? setCartProductCount(1) : setCartProductCount(cartProductCount - 1)
        removeFromCart(product.code)
    }

    const shoppingCart = (product) => {
        // const newCart = [...cart, product];
        // setCartItemsProducts(newCart)
        addToDB(product.code);
    }

    const handleFive = (product) => {
        addFive(product.code)
    }

    const handleTen = (product) => {
        addTen(product.code)
    }

    return (
        <div className="offcanvas offcanvas-end p-0" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div style={{ paddingBottom: '0' }} className="offcanvas-header">
                <h5 id="offcanvasRightLabel" className='fw-bold text-center'><img src={vegCartImage} alt="cart details" className='img-fluid pb-4' /> Cart Details
                    {/* <br />
                        <span style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Sub Total: {cartItems.reduce((a, b) => { return a + (b.count); }, 0)} Item(s)</span>
                        <br />
                        <span style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Grand Price: ৳ {cartItems.reduce((a, b) => a + b.price * b.count, 0)}</span> */}
                </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div style={{ padding: '0' }} className="offcanvas-body">
                <div style={{ marginBottom: '8rem' }} className="">
                    {
                        cartItems.map(product =>
                            <div key={product._id} style={{ width: '180px', height: 'auto' }} className="mx-auto d-block mt-3">

                                <div style={{ border: '1px solid rgba(120, 58, 58, 0.38)' }} className='py-2'>
                                    <img width={90} className='img-fluid mx-auto d-block rounded' src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} alt={product.name} />
                                    <h4 style={{ fontSize: '15px' }} className="fw-bold text-center mt-2">{product.price} Tk</h4>
                                    <h3 style={{ fontSize: '13px' }} className="fw-bold text-center">{product.name}</h3>

                                    <div className="d-flex justify-content-around align-items-center pt-2">
                                        <button className='btn-ft' onClick={() => handleFive(product)}>5</button>
                                        <button className='btn-ft' onClick={() => handleTen(product)}>10</button>
                                        <div className="d-flex bg-pm">
                                            <div style={{cursor:'pointer'}} onClick={() => addToCart(product)} className="px-2"><img className='img-fluid' src={plusImage} alt="add to cart" /></div>
                                            <div className="vr my-1"></div>
                                            <div style={{cursor:'pointer'}} onClick={() => handleRemove(product)} className="px-2"><img className='img-fluid' src={minusImage} alt="remove from cart" /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center px-1 mt-2">
                                    <div className="fw-bold">{product?.count} Kg</div>
                                    <div className="fw-bold">{product?.count * product.price} Tk</div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div style={{ boxShadow: '0 5px 15px #c4c4c44d', bottom: '0' }} onClick={() => handleClick()} className="position-absolute bg-white mx-auto d-block w-100 pt-4">
                    <div className="d-flex justify-content-around align-items-center pb-2">
                        <div className=""><h5 className='text-center fw-bold'>Total</h5></div>
                        <div className=""><h5 className='text-center fw-bold'>{cartItems.reduce((a, b) => a + b.price * b.count, 0)} Taka</h5></div>
                    </div>
                    <button disabled={disabled} className='btn-confirm-order mx-auto d-block px-5 w-100 fw-bold'>Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;