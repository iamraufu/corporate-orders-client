import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';
import rightArrow from '../images/right_arrow.svg';

const ProductByDivision = ({ category }) => {

    const [products, setProducts] = useState([])
    const skeleton = [0, 1, 2, 3, 4, 5]

    useEffect(() => {
        fetch(`https://corporateorders.herokuapp.com/products/${category?.name}/0/8`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [category])

    return (
        <div className='product-by-division'>
            <div className="d-flex justify-content-between align-items-center">
                <Link to={`${category?.route}`} onClick={() => { window.scrollTo(0, 0); }} className='text-black text-decoration-none sidebar-item'>
                    <h2 className='cart-title p-2 fw-bold'>{category?.name}</h2>
                </Link>

                <Link onClick={() => { window.scrollTo(0, 0); }} style={{ fontSize: '14px', color: '#595353' }} to={`${category?.route}`} className='text-black text-decoration-none'>View More <img className='img-fluid p-0' src={rightArrow} alt="view more" />
                </Link>
            </div>

            <div className="row align-items-center mt-3">
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            // col-lg-2 col-md-3 col-sm-4 col-6 justify-content-center
                            <div key={index + 1} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-center">
                                <ProductCard product={product} />
                            </div>
                        )
                        :
                        <div style={{ margin: '0' }} className="row justify-content-center align-items-center px-3">
                            {
                                skeleton.map(item =>
                                    <div key={item} className='skeleton-deck col-lg-2 col-md-3 col-sm-4 col-6 px-2 m-1'>
                                        <Skeleton />
                                    </div>
                                )}
                        </div>
                }
            </div>
        </div>
    );
};

export default ProductByDivision;