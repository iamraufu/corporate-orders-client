import React, { useState } from 'react'
import ProductRequest from './ProductRequest';
import box from '../images/box.png';
import useAuth from '../hooks/useAuth';

const ProductCard = ({ product }) => {

    const { addToDB, cart } = useAuth()

    const [carts, setCarts] = useState([]);

    const addToCart = (product) => {
        document.getElementById('view_cart').click()
        const newCart = [...carts, product];
        setCarts(newCart)
        addToDB(product);
    }

    const handleCart = (product) => {
        addToCart(product)
    }

    return (
        <div className="cart-deck my-2">

            <div className="cart-body d-flex align-items-center">
                <div style={{ height: '48px', width: '46px', backgroundColor: '#F6F9FC' }} className="col-md-3 d-flex justify-content-center align-items-center ms-2">
                    <img width={36} className='mx-auto d-block' src={box} alt={product?.name} />
                </div>

                <div className="p-2">
                    <p style={{ fontSize: '12px', minHeight:'35px' }} className="ps-2 m-0">{product.name || 'Name Not Available'}</p>

                    <div className="d-flex justify-content-between align-items-center ps-2">

                        {
                            cart.find(cart => cart.code === product.code) ? 
                            <button className="btn-add-to-cart-success d-flex justify-content-center align-items-center mt-1">Added</button>
                            : 
                            <div id={`btn-${product?.code}`}>
                                <button onClick={() => handleCart(product)} className="btn-add-to-cart d-flex justify-content-center align-items-center mt-1">Add Item</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <ProductRequest />
        </div>
    );
};

export default ProductCard;