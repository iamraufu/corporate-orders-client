import React, { 
    // useReducer, useEffect, 
    useState } from 'react'
import { addToDB, 
    // removeFromCart, removeFromDb 
} from '../utilities/localDB';
import ProductRequest from './ProductRequest';
import box from '../images/box.png';

const ProductCard = ({ product }) => {

    // const count = JSON.parse(localStorage.getItem('shopping-cart')).find(pd => pd.code === product?.code)?.count || 0;

    const [cart, setCart] = useState([]);
    // const [addToCartCount, setAddToCartCount] = useState(count)
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    // useEffect(() => {
    //     setAddToCartCount(count)
    //     forceUpdate()

    // }, [count, reducerValue])

    const addToCart = (product) => {
        document.getElementById('view_cart').click()
        // setAddToCartCount(addToCartCount + 1)
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product.code);
    }

    // const handleRemove = (product) => {
    //     if (addToCartCount === 0) {
    //         removeFromDb(product.code)
    //     }
    //     if (addToCartCount === 1) {
    //         setAddToCartCount(0)
    //         document.getElementById('view_cart').click()
    //         document.getElementById(`product-${product.code}`).style.display = 'none';
    //         document.getElementById(`btn-${product.code}`).style.display = 'block';
    //     }
    //     else {
    //         document.getElementById('view_cart').click()
    //         setAddToCartCount(addToCartCount - 1)
    //     }
    //     removeFromCart(product.code)
    // }

    const handleCart = (product) => {
        // document.getElementById(`product-${product.code}`).style.display = 'block';
        // document.getElementById(`btn-${product.code}`).style.display = 'none';
        addToCart(product)
    }

    return (
        <div className="cart-deck my-2">

            <div className="d-flex justify-content-between align-items-center pt-2">
                <div style={{ height: '48px', width: '46px', backgroundColor: '#F6F9FC' }} className="col-md-3 d-flex justify-content-center align-items-center ms-2">
                    <img width={36} className='mx-auto d-block' src={box} alt={product?.name} />
                </div>

                <div className="col-md-9">
                    <p style={{ fontSize: '13px', minHeight:'35px' }} className="px-2">{product.name || 'Name Not Available'}</p>

                    <div className="d-flex justify-content-between align-items-center px-2">
                        <div className="">
                            <p style={{ margin: '0', fontSize: '14px' }} className="fw-bold text-center">{product.price || 'Not uploaded'} Tk</p>
                        </div>

                        <div id={`btn-${product?.code}`}>
                            <button
                                onClick={() => handleCart(product)}
                                className="btn btn-add-to-cart mx-auto d-block d-flex justify-content-center align-items-center">Add Item</button>
                        </div>
                        
                        {/* <div id={`product-${product?.code}`} style={{ display: 'none' }}>
                            <div className="d-flex justify-content-center align-items-center mt-1 px-1">
                                <button onClick={() => handleRemove(product)}
                                    className='btn btn-sm btn-danger px-3 fw-bold'>-</button>
                                <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>{addToCartCount}</h3>
                                <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-3 fw-bold'>+</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>

            {/* <div className="cart">
                <img src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} className="cart-img-top mx-auto d-block" alt={product.name} />

                <div style={{ margin: '0' }} className="cart-body">
                    <p style={{ margin: '0', fontSize: '15px' }} className="fw-bold text-center pt-1">{product.price || 'Not uploaded'} Tk</p>
                    <p style={{ fontSize: '13px' }} className="text-center px-2">{product.name || 'Name Not Available'}</p>
                </div>

                <div id={`product-${product?.code}`} style={{ display: 'none' }}>
                    <div className="d-flex justify-content-center align-items-center mt-1 px-1">
                        <button onClick={() => handleRemove(product)}
                            className='btn btn-sm btn-danger px-3 fw-bold'>-</button>
                        <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>{addToCartCount}</h3>
                        <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-3 fw-bold'>+</button>
                    </div>
                </div>

                <div id={`btn-${product?.code}`}>
                    <button
                        onClick={() => handleCart(product)}
                        className="btn btn-add-to-cart mx-auto d-block mt-1">Add to Cart</button>
                </div>
            </div> */}
            <ProductRequest />
        </div>
    );
};

export default ProductCard;