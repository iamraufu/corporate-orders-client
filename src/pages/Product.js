import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { addToDB, removeFromCart, removeFromDb } from '../utilities/localDB';
// import Review from '../Review/Review';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://corporateorders.herokuapp.com/product/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
    }, [id])

    const [cart, setCart] = useState([]);
    const [addToCartCount, setAddToCartCount] = useState(0);

    const addToCart = (product) => {
        setAddToCartCount(addToCartCount + 1)
        addToShoppingCart(product);
    }

    const handleRemove = (product) => {
        if (addToCartCount === 0) {
            removeFromDb(product.code)
            document.getElementById(`product-${product.code}`).style.display = 'none';
            document.getElementById(`btn-${product.code}`).style.display = 'block';
        }
        addToCartCount === 1 ? setAddToCartCount(1) : setAddToCartCount(addToCartCount - 1)
        removeFromCart(product.code)
    }

    const addToShoppingCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDB(product.code);
    }

    const handleCart = (product) => {
        document.getElementById(`product-${product.code}`).style.display = 'block';
        document.getElementById(`btn-${product.code}`).style.display = 'none';
        addToCart(product)
    }

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
                                <h3 className='fs-6 mt-2 px-4 py-1 fw-bold'>{addToCartCount}</h3>
                                <button onClick={() => addToCart(product)} className='btn btn-sm btn-success px-4 fw-bold'>+</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <div id={`btn-${product?.code}`}>
                                {
                                    product?.name && <button onClick={() => handleCart(product)} className='btn btn-sm btn-add-to-cart mt-2 fw-bold'>Add to Cart</button>
                                }
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-8 mb-3">
                        <div style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white p-5 mt-4 mx-auto">
                            <h3 className='fs-5 fw-bold'>{product.name || "Loading..."}</h3>
                            <hr />
                            <p style={{ textAlign: 'justify' }} className='fs-6'>{product.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo temporibus, repellendus laboriosam in nihil natus reprehenderit? Temporibus hic earum praesentium culpa, quod at perferendis corrupti, iusto eligendi exercitationem repudiandae maiores nihil repellat nemo aspernatur vel architecto fugit placeat dignissimos sit voluptatum sapiente laboriosam. Sapiente iusto fugiat voluptatibus maiores vero!'}</p>
                            <hr />
                            <small>Price: <span className='fs-5 fw-bold'>৳ {product.price || 'Loading...'}</span></small>
                        </div>
                    </div>
                </div>

                {/* <Review /> */}

            </div>
        </section>
    );
};

export default Product;