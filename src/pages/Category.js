import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import divisionData from '../data/division.json'
import NotFound from './NotFound';

const Category = () => {

    const { id } = useParams();
    // eslint-disable-next-line
    const [skip, setSkip] = useState(0)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(20)
    const [products, setProducts] = useState([])

    const division = divisionData.find(item => item.route === id)
    const category = division?.name

    useEffect(() => {
        fetch(`https://swapno.up.railway.app/products/${category}/${skip}/${limit}`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [category, skip, limit])

    console.log(products)

    return (
        <section>
            <Navbar />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid">
                <div style={{ margin: '0' }} className="row">
                    <div style={{ padding: '0' }} className="col-lg-2 col-md-2">
                        <Sidebar />
                    </div>

                    <div style={{ padding: '0' }} className="col-lg-10 col-md-10">
                        <h1 className='text-center fw-bold my-3 fs-5'>{products[0]?.category}</h1>
                        {
                            division === undefined ?
                                <NotFound /> :
                                products?.length > 0 ?
                                    <div style={{ margin: '0' }} className="row px-3">
                                        {
                                            products.map(product =>
                                                <div style={{ padding: '0' }} key={product._id} className="col-lg-3 col-md-4 col-sm-6 px-2">
                                                    <ProductCard product={product} />
                                                </div>
                                            )}
                                    </div>
                                    : <p className='mt-5'>Loading...</p>
                        }
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Category;