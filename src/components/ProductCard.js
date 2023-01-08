import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDB } from '../utilities/localDB';
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {

    const quantity = 100;

    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        shoppingCart(product)
        Swal.fire(
            'Successful!',
            `You Have Added ${product.name}!`,
            'success'
        )
    }

    const shoppingCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product._id);
    }

    return (
        <div className="cart-deck my-5">

            <div className="cart">
                <Link to={`/product/${product._id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                    <img src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} className="cart-img-top img-fluid mx-auto d-block" alt={product.name} />
                </Link>

                <div className="">
                        <h5 className="cart-title px-2">{product.name || 'Name Not Available'}</h5>
                        <p className="cart-text ps-2">Product Code: <b>{product.code}</b></p>
                        <p className="cart-text ps-2">Price: <b>{product.price * parseFloat(quantity) || 'Not uploaded'}</b> Taka</p>
                        <p className="cart-text ps-2">In Stock: <b>{parseFloat(product.quantity) || 'Not uploaded'}</b></p>

                    {/* <div className="d-flex col-sm-6">
                        <button onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/product/${product.id}`);
                        }} className="btn btn-outline-dark">Details</button>

                        <button 
                        onClick={() => handleClick(product)} 
                        className='btn btn-danger ms-2 px-3'>Buy</button>
                    </div> */}
                </div>

                {/* <select className='form-select' id='quantity' onChangeCapture={() => setQuantity(document.getElementById('quantity').querySelector('option:checked').value)}>

                                            {
                                                product.weight.map((item, index) =>
                                                    <option key={index + 1} value={item.amount} className='mt-5'>{item.title}</option>)
                                            }

                                        </select> */}

                <button 
                onClick={() => addToCart(product)} 
                className="btn btn-dark mx-auto d-block my-3 cart-text">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;