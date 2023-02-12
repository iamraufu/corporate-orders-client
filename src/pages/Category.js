import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Skeleton from '../components/Skeleton';
import VegCart from '../components/VegCart';
import WhatsApp from '../components/WhatsApp';
import divisionData from '../data/division.json'
import NotFound from './NotFound';

const Category = () => {

    const { id } = useParams();
    const skeleton = Array.from({ length: 4 }, (_, i) => i);
    // eslint-disable-next-line
    const [skip, setSkip] = useState(0)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(24)
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const division = divisionData.find(item => item.route === id)
    const category = division?.name

    useEffect(() => {
        hasMore && fetchData();
        // eslint-disable-next-line
    }, [category, skip, limit]);

    const fetchData = async () => {
        const data = await fetch(`https://corporateorders.herokuapp.com/products/${category}/${skip}/${limit}`)
            .then(response => response.json());

        if (data.length === 0) {
            setHasMore(false);
            return;
        }
        setProducts([...products, ...data]);
    };

    const handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        if (hasMore === true) {
            if (scrollHeight - innerHeight - scrollTop <= 50) {
                setSkip(prevSkip => prevSkip + limit)
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     fetch(`https://corporateorders.herokuapp.com/products/${category}/${skip}/${limit}`)
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    // }, [category, skip, limit])

    return (
        <section>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid">
                <div style={{ margin: '0' }} className="row">
                    <div style={{ padding: '0' }} className="col-lg-2">
                        <div style={{ top: '70px' }} className="sticky-top">
                            <Sidebar />
                        </div>
                    </div>

                    <div style={{ padding: '0' }} className="col-lg-10 col-md-12">
                        <h1 style={{ fontSize: '14px' }} className='text-center fw-bold my-3'>{products[0]?.division}</h1>
                        {
                            division === undefined ?
                                <NotFound /> :
                                products?.length > 0 ?
                                    <div style={{ margin: '0' }} className="row px-3">
                                        {
                                            products.map(product =>
                                                // col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center align-items-center px-2
                                                <div style={{ padding: '0' }} key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-center px-2">
                                                    <ProductCard product={product} />
                                                </div>
                                            )}
                                        {
                                            products.length > 24 &&
                                                hasMore ?
                                                <div style={{ margin: '0' }} className="row justify-content-center align-items-center ps-0">
                                                    {
                                                        skeleton.map(item =>
                                                            <div key={item} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                                                                <Skeleton />
                                                            </div>
                                                        )}
                                                </div> :
                                                <div className='text-center fw-bold my-3'>No more data to display.</div>
                                        }
                                    </div>
                                    :
                                    <div style={{ margin: '0' }} className="row justify-content-center align-items-center px-3">
                                        {
                                            skeleton.map(item =>
                                                <div key={item} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                                                    <Skeleton />
                                                </div>
                                            )}
                                    </div>
                        }
                    </div>
                    <VegCart />
                </div>
                <CartDetails />
                <WhatsApp />
            </div>

        </section>
    );
};

export default Category;