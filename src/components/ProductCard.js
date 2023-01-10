import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDB } from '../utilities/localDB';

const ProductCard = ({ product }) => {

    const [cart, setCart] = useState([]);
    // const shoppingList = JSON.parse(localStorage.getItem('shopping-cart'));
    // const thisProduct = shoppingList?.filter(pd => pd?.code === product?.code)
    // console.log(thisProduct,shoppingList);

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product.code);
    }

    const handleCart = (product) => {
        document.getElementById(`product-${product.code}`).style.display = 'block';
        document.getElementById(`btn-${product.code}`).style.display = 'none';
        addToCart(product)
    }

    return (
        <div className="cart-deck my-2">

            <div className="cart">
                <Link to={`/product/${product._id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                    <img src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} className="cart-img-top img-fluid mx-auto d-block" alt={product.name} />
                </Link>

                <div className="cart-body">
                    <h5 className="cart-title px-2">{product.name || 'Name Not Available'}</h5>
                    <p className="cart-text ps-2">Product Code: <b>{product.code}</b></p>
                    <p className="cart-text ps-2">Price: <b>{product.price || 'Not uploaded'}</b> Taka</p>
                    <p className="cart-text ps-2">In Stock: <b>{product.quantity || 'Not uploaded'}</b></p>
                </div>

                {/* <select className='form-select' id='quantity' onChangeCapture={() => setQuantity(document.getElementById('quantity').querySelector('option:checked').value)}>

                                            {
                                                product.weight.map((item, index) =>
                                                    <option key={index + 1} value={item.amount} className='mt-5'>{item.title}</option>)
                                            }

                </select> */}

                <div id={`product-${product?.code}`} style={{ display: 'none' }}>
                    <div className="d-flex justify-content-center align-items-center mt-1">
                        <button
                            // onClick={() => handleRemove(product)} 
                            className='btn btn-sm btn-danger px-4 fw-bold'>-</button>
                        <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>Not Implemented</h3>
                        <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-4 fw-bold'>+</button>
                    </div>
                </div>

                <div id={`btn-${product?.code}`}>
                    <button
                        onClick={() => handleCart(product)}
                        className="btn btn-primary mx-auto d-block cart-text">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;