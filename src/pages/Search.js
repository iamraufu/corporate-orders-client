import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductRequest from '../components/ProductRequest';
import Sidebar from '../components/Sidebar';
import Skeleton from '../components/Skeleton';
import VegCart from '../components/VegCart';
// import useAuth from '../hooks/useAuth';

let flag = false
// let products = []

const Search = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    id === undefined && navigate('/');

    // const { credential } = useAuth()
    // const { searchProducts , setSearchProducts} = credential
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(24)
    // const skeleton = Array.from({ length: 16 }, (_, i) => i);
    const skeleton2 = Array.from({ length: 4 }, (_, i) => i);
    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         fetch(`https://corporate-orders-server.onrender.com/products/${skip}/${limit}?search=${id}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 window.scrollTo(0, 0);
    //                 setProducts(data.products)
    //             })
    //     }, 500)
    //     return () => {
    //         clearTimeout(handler);
    //     };
    // }, [id, skip, limit])

    // ---------------------------------------
    const [hasMore, setHasMore] = useState(true);
    // const [count, setCount] = useState(0)
    // const [flag, setFlag] = useState(false)

    useEffect(() => {
        hasMore && fetchData();
        // eslint-disable-next-line
    }, [id, skip, limit, hasMore]);

    const fetchData = async () => {

        flag = true

        const data = await fetch(`https://corporate-orders-server.onrender.com/products/${skip}/${limit}?search=${id}`)
            .then(response => response.json())
            .finally(response => flag = false)
        setProducts([...products, ...data.products]);
        // setCount(data.count)

        if (data.products.length === 0) {
            setHasMore(false);
            return;
        }
    };

    const handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if (hasMore === true) {
            if (scrollHeight - innerHeight - scrollTop <= 50) {
                flag === false && setSkip(prevSkip => prevSkip + limit)
                // setSkip(prevSkip => prevSkip + limit)
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, []);

    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid row">
                <div style={{ padding: '0' }} className="col-lg-2">
                    <div style={{ top: '70px' }} className="sticky-top">
                        <Sidebar />
                    </div>
                </div>

                <div className="col-lg-10">
                    <h1 className='fs-6 text-center text-muted pt-3'>Showing Search result for: <b>{id}</b>
                        {/* <small> (from {count} items)</small> */}
                    </h1>
                    {/* <h2 className='fs-6 text-center text-muted pt-3'>Showing result of: <b>{id}</b></h2> */}
                    <div className="row justify-content-center align-items-center mt-3">
                        {/* {
                            products.length > 0 &&
                            products.map((product, index) =>
                                <div key={index + 1} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-center px-2">
                                    <li>{index + 1}</li>
                                    <ProductCard product={product} />
                                </div>
                            )
                        } */}

                        {
                            products.length === 0 && <div className='text-center fw-bold my-3'>No products found.</div>
                        }
                        {

                            products?.length > 0 &&
                            <div style={{ margin: '0' }} className="row px-3">
                                {
                                    products.map((product, index) =>
                                        // col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center align-items-center px-2
                                        <div style={{ padding: '0' }} key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-center px-2">
                                            <ProductCard product={product} />
                                        </div>
                                    )}
                                {
                                    products.length > 23 &&
                                        hasMore ?
                                        <div style={{ margin: '0' }} className="row justify-content-center align-items-center ps-0">
                                            {
                                                skeleton2.map(item =>
                                                    <div key={item} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                                                        <Skeleton />
                                                    </div>
                                                )}
                                        </div> :
                                        <div className='text-center fw-bold my-3'>No more products to display.</div>
                                }
                            </div>
                            // :
                            // <div style={{ margin: '0' }} className="row justify-content-center align-items-center px-3">
                            //     <h1 style={{ fontSize: '14px' }} className='text-center fw-bold mb-3'>Loading ...</h1>
                            //     {
                            //         skeleton.map(item =>
                            //             <div key={item} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                            //                 <Skeleton />
                            //             </div>
                            //         )}
                            // </div>
                        }
                    </div>
                </div>
                <VegCart />
                <CartDetails />
                <ProductRequest />
            </div>
        </section>
    );
};

export default Search;