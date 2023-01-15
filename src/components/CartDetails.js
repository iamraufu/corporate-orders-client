import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getStoredCart, addToDB, removeFromCart } from '../utilities/localDB';

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

    return (
        <section style={{padding:'0'}} className='container'>

            <div style={{ borderBottom: '1px solid lightgrey' }} className="sticky-top bg-white mb-2">
                <h2 style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Cart Details</h2>
                <h2 style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Sub Total: {cartItems.reduce((a, b) => { return a + (b.count); }, 0)} Item(s)</h2>
                <h2 style={{ fontSize: '13px' }} className='fw-bold text-center pt-2'>Grand Price: ৳ {cartItems.reduce((a, b) => a + b.price * b.count, 0)}</h2>
            </div>

            {
                cartItems.map(product =>
                    <div key={product._id} className="">
                        <img width={100} className='img-fluid mx-auto d-block rounded' src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} alt={product.name} />
                        <h3 style={{ fontSize: '11px' }} className="fw-bold text-center mt-2">{product.name}</h3>
                        <h4 style={{ fontSize: '12px' }} className="fw-bold text-center">৳ {product?.count * product.price}</h4>

                        <div className="d-flex justify-content-center align-items-center">
                            <button onClick={() => handleRemove(product)} className='cart-btn fw-bold mx-auto d-block'>-</button>
                            <h4 style={{ fontSize: '12px' }} className="fw-bold text-center pt-2">{product?.count}</h4>
                            <button onClick={() => addToCart(product)} className='cart-btn-success fw-bold mx-auto d-block'>+</button>
                        </div>
                        <hr />
                    </div>
                )
            }
            <div onClick={() => handleClick()} className="sticky-bottom bg-white">
                <button disabled={disabled} className='btn btn-dark mx-auto d-block px-5'>Checkout</button>
            </div>
        </section>
    );
};

export default CartDetails;