// const addToDB = product => {
//     addQuantity(product.code, 1)

//     const products = addProducts(product)
//     addCartProductsToDB(products);
// }

// const addFive = product => {
//     addQuantity(product.code, 5)

//     const products = addProducts(product)
//     addCartProductsToDB(products);
// }

// const addTen = product => {
//     addQuantity(product.code, 10)

//     const products = addProducts(product)
//     addCartProductsToDB(products);
// }

// const addProducts = product => {
//     let products = [];

//     if (localStorage.getItem('products')) {
//         products = JSON.parse(localStorage.getItem('products'));
//     }

//     const existingProduct = products.find(p => p.code === product.code);

//     if (existingProduct) {
//         existingProduct.quantity += product.quantity;
//     } else {
//         products.push(product);
//     }

//     return products;
// }

// const addQuantity = (code, count) => {

//     let cart = {};

//     //get the shopping cart from local storage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         cart = JSON.parse(storedCart);
//     }

//     // add quantity
//     const quantity = cart[code];
//     if (quantity) {
//         const newQuantity = quantity + count;
//         cart[code] = newQuantity;
//     }

//     else {
//         cart[code] = 1;
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// const removeFromCart = code => {
//     let cart = {};
//     //get the shopping cart from local storage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         cart = JSON.parse(storedCart);
//     }

//     // remove quantity
//     const quantity = cart[code];
//     if (quantity) {
//         const newQuantity = quantity - 1;

//         if (newQuantity === 0) {
//             removeFromDb(code)
//         }
//         else {
//             cart[code] = newQuantity;
//             localStorage.setItem('cart', JSON.stringify(cart));
//         }
//     }

//     // localStorage.setItem('cart', JSON.stringify(cart));
// }

// const addCartProductsToDB = products => {
//     let tempCart = []
//     const savedCart = getStoredCart()

//     for (let key in savedCart) {
//         if (products.find(pd => pd.code === key)) {
//             tempCart.push({ ...products.find(pd => pd.code === key), count: savedCart[key] })
//         }
//         else {
//             tempCart.push({ ...products[0], count: savedCart[key] })
//         }
//     }
//     setCart()
//     localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
// }

// const getStoredCart = () => {
//     let shoppingCart = {};

//     //get the shopping cart from local storage
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         shoppingCart = JSON.parse(storedCart);
//     }
//     return shoppingCart;
// }

// const getProducts = () => {
//     let products = [];

//     //get the shopping cart from local storage
//     const storedProducts = localStorage.getItem('shopping-cart');
//     if (storedProducts) {
//         products = JSON.parse(storedProducts);
//     }
//     return products;
// }

// const removeFromDb = code => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//         const shoppingCart = JSON.parse(storedCart);
//         if (code in shoppingCart) {
//             delete shoppingCart[code];
//             localStorage.setItem('cart', JSON.stringify(shoppingCart));
//         }
//     }
//     // setTimeout(() => window.location.reload(), 1000);
// }

// const deleteShoppingCart = () => {
//     localStorage.removeItem('cart');
//     window.location.reload();
// }

// export {
//     addToDB,
//     addFive,
//     addTen,
//     addCartProductsToDB,
//     removeFromCart,
//     getStoredCart,
//     getProducts,
//     removeFromDb,
//     deleteShoppingCart
// }

import { useState } from "react";

const LocalDB = () => {

    const [cart, setCart] = useState([])

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

        if (localStorage.getItem('products')) {
            products = JSON.parse(localStorage.getItem('products'));
        }

        const existingProduct = products.find(p => p.code === product.code);

        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            products.push(product);
        }

        return products;
    }

    const removeProduct = product => {
        let products = [];

        if (localStorage.getItem('products')) {
            products = JSON.parse(localStorage.getItem('products'));
        }

        const existingProduct = products.find(p => p.code === product.code);

        if (existingProduct) {
            existingProduct.quantity -= product.quantity;
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

    const removeQuantity = code => {
        let cart = {};
        //get the shopping cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        // remove quantity
        const quantity = cart[code];
        if (quantity) {
            const newQuantity = quantity - 1;

            if (newQuantity === 0) {
                removeFromDb(code)
            }
            else {
                cart[code] = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }

    const removeFromCart = product => {
        removeQuantity(product.code)
        const updatedProducts = removeProduct(product)
        addCartProductsToDB(updatedProducts)
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

    return {
        cart,
        addToDB,
        addFive,
        addTen,
        addCartProductsToDB,
        removeFromCart,
        getStoredCart,
        getProducts,
        removeFromDb,
        deleteShoppingCart
    }
};
export default LocalDB;