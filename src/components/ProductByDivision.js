import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';

const ProductByDivision = ({ category }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`https://shwapno.up.railway.app/products/${category?.name}/0/4`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [category])

    return (
        <div className='product-by-division container'>
            <div className="d-flex justify-content-between align-items-center">
                <Link to={`${category?.route}`} className='text-black text-decoration-none sidebar-item'>
                    <h2 className='cart-title p-2 fw-bold'>{category?.name}</h2>
                </Link>
                <Link to={`${category?.route}`} className='text-black text-decoration-none'>
                    <button className='btn btn-sm btn-dark px-4 me-2'>See All</button>
                </Link>
            </div>
            <div className="row justify-content-center align-items-center mt-3">
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <div key={index + 1} className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
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