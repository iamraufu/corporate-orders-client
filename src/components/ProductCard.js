import React, { useState } from 'react';
import { addToDB, removeFromCart, removeFromDb } from '../utilities/localDB';

const ProductCard = ({ product }) => {

    const [cart, setCart] = useState([]);
    const [addToCartCount, setAddToCartCount] = useState(0);

    const addToCart = (product) => {
        setAddToCartCount(addToCartCount + 1)
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product.code);
    }

    const handleRemove = (product) => {
        if (addToCartCount === 0) {
            removeFromDb(product.code)
        }
        if(addToCartCount === 1){
            setAddToCartCount(0)
            document.getElementById(`product-${product.code}`).style.display = 'none';
            document.getElementById(`btn-${product.code}`).style.display = 'block';
        }
        else {
            setAddToCartCount(addToCartCount - 1)
        }
        removeFromCart(product.code)
    }

    const handleCart = (product) => {
        document.getElementById(`product-${product.code}`).style.display = 'block';
        document.getElementById(`btn-${product.code}`).style.display = 'none';
        addToCart(product)
    }

    return (
        <div className="cart-deck my-2">

            <div className="cart">
                {/* <Link to={`/product/${product._id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'> */}
                    <img src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} className="cart-img-top mx-auto d-block" alt={product.name} />
                {/* </Link> */}

                <div style={{margin:'0'}} className="cart-body">
                    <p style={{margin:'0', fontSize:'15px'}} className="fw-bold text-center pt-1">{product.price || 'Not uploaded'} Tk</p>
                    <p style={{fontSize:'13px'}} className="text-center px-2">{product.name || 'Name Not Available'}</p>
                </div>

                <div id={`product-${product?.code}`} style={{ display: 'none' }}>
                    <div className="d-flex justify-content-center align-items-center mt-1 px-1">
                        <button onClick={() => handleRemove(product)}
                            className='btn btn-sm btn-danger px-4 fw-bold'>-</button>
                        <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>{addToCartCount}</h3>
                        <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-4 fw-bold'>+</button>
                    </div>
                </div>

                <div id={`btn-${product?.code}`}>
                    <button
                        onClick={() => handleCart(product)}
                        className="btn btn-add-to-cart mx-auto d-block mt-1">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;