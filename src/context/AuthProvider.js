import React, { createContext, useEffect, useState } from 'react';
import useCredential from '../hooks/useCredential';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const shoppingCart = localStorage.getItem('shopping-cart')
    const requestedProducts = localStorage.getItem('requested-product')
    const [cart, setCart] = useState([])
    const [requestedProduct, setRequestedProduct] = useState([])

    useEffect(() => {
        if (shoppingCart) {
            setCart(JSON.parse(shoppingCart))
        }
        else {
            setCart([])
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (requestedProducts) {
            setRequestedProduct(JSON.parse(requestedProducts))
        }
        else {
            setRequestedProduct([])
        }
        // eslint-disable-next-line
    }, [])

    const addToDB = product => {
        addQuantity(product.code, 1)

        const products = addProducts(product)
        addCartProductsToDB(products);
    }

    const addFive = product => {
        addQuantity(product.code, 5)

        const products = addProducts(product)
        addCartProductsToDB(products);
    }

    const addTen = product => {
        addQuantity(product.code, 10)

        const products = addProducts(product)
        addCartProductsToDB(products);
    }

    const addProducts = product => {
        let products = [];

        if (localStorage.getItem('shopping-cart')) {
            products = JSON.parse(localStorage.getItem('shopping-cart'));
        }

        const existingProduct = products.find(p => p.code === product.code);

        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            products.push(product);
        }

        return products;
    }

    const addQuantity = (code, count) => {

        let cart = {};

        //get the shopping cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        // add quantity
        const quantity = cart[code];
        if (quantity) {
            const newQuantity = quantity + count;
            cart[code] = newQuantity;
        }

        else {
            cart[code] = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const removeFromCart = product => {
        let cart = {};
        //get the shopping cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        // remove quantity
        const quantity = cart[product.code];
        if (quantity) {
            const newQuantity = quantity - 1;

            if (newQuantity === 0) {
                removeFromDb(product.code)
            }
            else {
                cart[product.code] = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }

        let products = [];

        if (localStorage.getItem('shopping-cart')) {
            products = JSON.parse(localStorage.getItem('shopping-cart'));
        }

        const existingProduct = products.find(p => p.code === product.code);

        if (existingProduct) {
            existingProduct.quantity -= product.quantity;
        } else {
            products.push(product);
        }

        let tempCart = []
        const savedCart = getStoredCart()

        for (let key in savedCart) {
            if (products.find(pd => pd.code === key)) {
                tempCart.push({ ...products.find(pd => pd.code === key), count: savedCart[key] })
            }
            else {
                tempCart.push({ ...products[0], count: savedCart[key] })
            }
        }
        setCart(tempCart)
        localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
    }

    const addCartProductsToDB = products => {
        let tempCart = []
        const savedCart = getStoredCart()

        for (let key in savedCart) {
            if (products.find(pd => pd.code === key)) {
                tempCart.push({ ...products.find(pd => pd.code === key), count: savedCart[key] })
            }
            else {
                tempCart.push({ ...products[0], count: savedCart[key] })
            }
        }
        setCart(tempCart)
        localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
    }

    const getStoredCart = () => {
        let shoppingCart = {};

        //get the shopping cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            shoppingCart = JSON.parse(storedCart);
        }
        return shoppingCart;
    }

    const getProducts = () => {
        let products = [];

        //get the shopping cart from local storage
        const storedProducts = localStorage.getItem('shopping-cart');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        }
        return products;
    }

    const removeFromDb = code => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const shoppingCart = JSON.parse(storedCart);
            if (code in shoppingCart) {
                delete shoppingCart[code];
                localStorage.setItem('cart', JSON.stringify(shoppingCart));
            }
        }
        // setTimeout(() => window.location.reload(), 1000);
    }

    const deleteShoppingCart = () => {
        localStorage.removeItem('cart');
        window.location.reload();
    }

    const credential = useCredential();

    const allContexts = {
        credential,
        addToDB,
        addFive,
        addTen,
        addQuantity,
        removeFromCart,
        addCartProductsToDB,
        addProducts,
        getStoredCart,
        getProducts,
        removeFromDb,
        deleteShoppingCart,
        cart,
        setCart,
        requestedProduct,
        setRequestedProduct
    }

    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;