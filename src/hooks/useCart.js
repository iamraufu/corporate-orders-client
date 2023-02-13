import { useEffect, useState } from 'react';
import useAuth from './useAuth';
// import { getStoredCart } from '../utilities/localDB';

const useCart = () => {

    const {localDB} = useAuth();

    // Cart data 
    const savedCart = localDB.getStoredCart()
    const productKeys = Object.keys(savedCart)

    // const id = localStorage.getItem('shopping-cart')
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (Object.keys(localDB.getStoredCart()).length > 0) {
            fetch('https://corporateorders.herokuapp.com/productsByCodes', {
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
                    setCart(tempCart)
                    localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
                })
        }
    }, [productKeys, savedCart, localDB])

    // useEffect(() => {
    //     if (id) {
    //         setCart(JSON.parse(id))
    //     }
    //     else {
    //         setCart([])
    //     }
    // }, [id])

    return {
        setCart,
        cart
    }
};

export default useCart;