// import Swal from "sweetalert2";

// use local storage to manage cart data
const addToDB = code => {
    let cart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    // add quantity
    const quantity = cart[code];
    if (quantity) {
        const newQuantity = quantity + 1;
        cart[code] = newQuantity;
    }

    else {
        cart[code] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    addCartProductsToDB();
}

const addFive = code => {
    let cart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    // add quantity
    const quantity = cart[code];
    if (quantity) {
        const newQuantity = quantity + 5;
        cart[code] = newQuantity;
    }

    else {
        cart[code] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    addCartProductsToDB();
}

const addTen = code => {
    let cart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    // add quantity
    const quantity = cart[code];
    if (quantity) {
        const newQuantity = quantity + 10;
        cart[code] = newQuantity;
    }

    else {
        cart[code] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    addCartProductsToDB();
}

const removeFromCart = code => {
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

        if (newQuantity === 0){
            removeFromDb(code)
        }
        else {
            cart[code] = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    // localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartProductsToDB = () => {
    const savedCart = getStoredCart()
    const productKeys = Object.keys(savedCart)
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
                // setCartItems(tempCart)
                localStorage.setItem('shopping-cart', JSON.stringify(tempCart))
            })
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

export {
    // addToDB as addToDb,
    addToDB,
    addFive,
    addTen,
    addCartProductsToDB,
    removeFromCart,
    getStoredCart,
    removeFromDb,
    deleteShoppingCart
}