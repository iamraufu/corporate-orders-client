import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Cart.css';
import { getStoredCart, deleteShoppingCart, addToDB, removeFromCart } from '../utilities/localDB';
import Swal from 'sweetalert2';

const Cart = () => {

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    // eslint-disable-next-line
    const [product, setProduct] = useState({});

    // Cart data 
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)
    
    let cart = []

    useEffect(() => {
        fetch('http://localhost:8000/productsByCodes', {
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
            document.getElementById('btn_checkout').style.cursor = 'pointer';
            document.getElementById('btn_checkout').className = 'btn btn-dark mx-auto d-block p-2';
            document.getElementById('btn_checkout_sm').className = 'btn btn-dark mx-auto d-block p-2';
        }
        else{
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
    const [cartItemsProducts, setCartItemsProducts] = useState([]);
    const [cartProduct, setCartProduct] = useState(JSON.parse(localStorage.getItem('shopping-cart')).filter(pd => pd?.code === product?.code))
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
        const newCart = [...cart, product];
        setCartItemsProducts(newCart)
        addToDB(product.code);
    }

    return (
        <section className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <div className="row">

                    <div className="cart-container col-lg-9">
                        <h1 className='mt-5 fs-4 cart-container-title'>Shopping Cart</h1>
                        {
                            cartItems?.length > 0 ?
                                <div className="table-responsive pb-5">
                                    <table style={{ border: '1px solid lightgrey' }} className="table table-striped">
                                        <thead style={{ backgroundColor: '#E9EEF4' }}>
                                            <tr className='text-center'>
                                                <th>Image</th>
                                                <th>Code</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Sub Total</th>
                                                <th>Remove</th>
                                                <th>Add</th>
                                                {/* <th>Remove</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((product, index) => (
                                                    <tr key={index + 1} className='text-center'>
                                                        <td><img src={product?.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} className='img-fluid' width={40} alt={product?.name} /></td>
                                                        <td>{product?.code}</td>
                                                        <td>{product?.name}</td>
                                                        <td>{product?.price}</td>
                                                        <td>{product?.count}</td>
                                                        <td>{product?.count * product.price}</td>
                                                        {/* <td><button onClick={() => removeFromDb(product._id)} className='btn btn-danger'>Remove</button></td> */}
                                                        <td><button onClick={() => handleRemove(product)} className='btn btn-sm btn-danger px-4 fw-bold'>-</button></td>
                                                        <td><button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-4 fw-bold'>+</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <button onClick={() => deleteShoppingCart()} className='btn btn-outline-danger'>Remove All Products</button>
                                </div>
                                :
                                <p style={{ maxWidth: '500px', backgroundColor: '#E9EEF4' }} className='p-2 text-primary'>Your Cart is empty <Link to='/' className='text-decoration-none'><span className='text-black'>Go Back</span></Link></p>
                        }
                    </div>

                    <div className="col-lg-3 mt-5 pb-2 d-none d-lg-block">
                        <div style={{ border: '1px solid lightgrey' }} className="p-2 mt-4">
                            <h2 className='fs-5 text-center'>Sub Total: {cartItems.reduce((a, b) => { return a + (b.count); }, 0)} Item(s)</h2>
                            <h3 className='fs-5 text-center'>Price: {cartItems.reduce((a, b) => a + b.price * b.count, 0)} Taka</h3>
                        </div>

                        <div onClick={() => handleClick()} style={{ border: '1px solid lightgrey' }} className="py-2">
                            <button id='btn_checkout' className='btn btn-secondary mx-auto d-block' disabled={disabled}>Proceed to Checkout</button>
                        </div>
                    </div>

                    <div style={{ boxShadow: '0 3px 10px 3px #0003' }} className="col-lg-3 mt-5 py-3 d-lg-none fixed-bottom bg-brand">
                        <div style={{ border: '1px solid lightgrey' }} className="p-2">
                            <h2 className='fs-5 text-center'>Sub Total: {cartItems.reduce((a, b) => { return a + (b.count); }, 0)} Item(s)</h2>
                            <h3 className='fs-5 text-center'>Price: {cartItems.reduce((a, b) => a + b.price * b.count, 0)} Taka</h3>
                        </div>

                        <div onClick={() => handleClick()} style={{ border: '1px solid lightgrey' }} className="py-2">
                            <button id='btn_checkout_sm' className='btn btn-secondary mx-auto d-block' disabled={disabled}>Proceed to Checkout</button>
                        </div>
                    </div>

                </div>
            </div>
            {/* <Footer /> */}
        </section>
    );
};

export default Cart;