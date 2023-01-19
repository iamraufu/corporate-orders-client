import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';
import rightArrow from '../images/right_arrow.svg';

const ProductByDivision = ({ category }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/products/${category?.name}/0/6`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [category])

    return (
        <div className='product-by-division'>
            <div className="d-flex justify-content-between align-items-center">
                <Link to={`${category?.route}`} onClick={() => { window.scrollTo(0, 0); }} className='text-black text-decoration-none sidebar-item'>
                    <h2 className='cart-title p-2 fw-bold'>{category?.name}</h2>
                </Link>

                <Link onClick={() => { window.scrollTo(0, 0); }} style={{fontSize:'14px', color:'#595353'}} to={`${category?.route}`} className='text-black text-decoration-none'>View More <img className='img-fluid p-0' src={rightArrow} alt="view more" />
                </Link>
            </div>

            <div className="row justify-content-center align-items-center mt-3">
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <div key={index + 1} className="col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center align-items-center">
                                <ProductCard product={product} />
                            </div>
                        )
                        :
                        <>
                            <div className='skeleton-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                            <div className='skeleton-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                            <div className='skeleton-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default ProductByDivision;