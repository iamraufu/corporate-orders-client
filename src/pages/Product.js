import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { addToDB, removeFromCart } from '../utilities/localDB';
// import Swal from 'sweetalert2';
// import Review from '../Review/Review';

const Product = () => {

    // eslint-disable-next-line
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://shwapno.up.railway.app/product/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, [id])

    const [cart, setCart] = useState([]);
    const [cartProduct, setCartProduct] = useState([])
    const [cartProductCount, setCartProductCount] = useState(cartProduct.length)
    const shoppingList = JSON.parse(localStorage.getItem('shopping-cart'));

    // const shoppingCartItems = shoppingList.filter(pd => pd?.code === product?.code)
    // console.log(shoppingCartItems)

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
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product.code);
    }

    // const handleClick = (product) => {
    //     shoppingCart(product);
    //     navigate('/shipping')
    // }

    const handleCart = (product) => {
        document.getElementById(`product-${product.code}`).style.display = 'block';
        document.getElementById(`btn-${product.code}`).style.display = 'none';
        setCartProductCount(cartProductCount + 1)
        addToCart(product)
    }

    // useEffect(() => {
    //     if (cartProductCount > 1) {
    //         document.getElementById(`product-${product.code}`).style.display = 'block';
    //         document.getElementById(`btn-${product.code}`).style.display = 'none';
    //     }
    //     else {
    //         document.getElementById(`product-${product.code}`).style.display = 'none';
    //         document.getElementById(`btn-${product.code}`).style.display = 'block';
    //     }
    // }, [product.code, cartProductCount])

    // useEffect(()=> {
    //     cartProductCount === cartProduct[0]?.quantity &&
    //     alert("You have chosen Maximum quantity");
    // },[cartProductCount,cartProduct])

    return (
        <section className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Product Details</h1>

                <div className="row mt-5 justify-content-center align-items-center">

                    <div className="col-lg-4">
                        <img src={product.image || 'https://miro.medium.com/max/600/0*jGmQzOLaEobiNklD'} style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className='img-fluid mx-auto d-block mb-3' width={250} alt={product.image} />

                        <div id={`product-${product?.code}`} style={{ display: 'none' }}>
                            <div className="d-flex justify-content-center align-items-center">
                                <button onClick={() => handleRemove(product)} className='btn btn-sm btn-danger px-4 fw-bold'>-</button>
                                <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>{cartProductCount || 1}</h3>
                                <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-4 fw-bold'>+</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <div id={`btn-${product?.code}`}>
                                <button onClick={() => handleCart(product)} className='btn btn-sm btn-primary mt-2 fw-bold'>Add to Cart</button>
                            </div>
                            {/* <button onClick={() => handleClick(product)} className='btn btn-sm btn-info mt-2 ms-2 fw-bold'>Buy Now</button> */}
                        </div>

                    </div>

                    <div className="col-lg-8 mb-3">
                        <div style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white p-5 mt-4 mx-auto">
                            <h3 className='fs-5 fw-bold'>{product.name}</h3>
                            <hr />
                            <p style={{ textAlign: 'justify' }} className='fs-6'>{product.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo temporibus, repellendus laboriosam in nihil natus reprehenderit? Temporibus hic earum praesentium culpa, quod at perferendis corrupti, iusto eligendi exercitationem repudiandae maiores nihil repellat nemo aspernatur vel architecto fugit placeat dignissimos sit voluptatum sapiente laboriosam. Sapiente iusto fugiat voluptatibus maiores vero!'}</p>
                            <hr />
                            <small>Price: <span className='fs-5 fw-bold'>৳ {product.price || 'Not Uploaded'}</span></small>
                        </div>
                    </div>
                </div>

                {/* <Review /> */}

            </div>
        </section>
    );
};

export default Product;