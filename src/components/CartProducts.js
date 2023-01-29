import React, { useEffect, useState } from 'react';
import { addFive, addTen, addToDB, removeFromCart } from '../utilities/localDB';

const CartProducts = ({ product }) => {

    const [cartProduct, setCartProduct] = useState([])

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
        <div style={{ borderBottom: '1px solid #E4DADA' }} className="py-2">
            <div className="d-flex justify-content-between align-item-center px-2">
                <div onClick={() => addToCart(product)} style={{ width: '18px', height: '18px', backgroundColor: '#D9D9D9', cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">+</div>
                <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className="">{product.name}</h2></div>
                <div onClick={() => handleFive(product)} style={{ fontSize: '10px', height: '28px', width: '28px', backgroundColor: '#D9D9D9', borderRadius: '50%', cursor: 'pointer' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">5Kg</div>
                <div onClick={() => handleTen(product)} style={{ fontSize: '10px', height: '28px', width: '28px', backgroundColor: '#D9D9D9', borderRadius: '50%', cursor: 'pointer' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">10Kg</div>
            </div>

            <div className="d-flex justify-content-between align-item-center px-2 mt-2">
                <div onClick={() => handleRemove(product)} style={{ width: '18px', height: '18px', backgroundColor: '#D9D9D9', cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">-</div>
                <div className="col-md-6"></div>
                {/* <div className="col-md-2"><h4 style={{ fontSize: '15px' }} className="fw-bold float-end">{product.price} Tk</h4></div> */}
                <div className="col-md-2"><h4 style={{ fontSize: '15px' }} className="float-end">{product?.count} Kg</h4></div>
            </div>
        </div>
    );
};

export default CartProducts;