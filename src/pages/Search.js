import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartDetails from '../components/CartDetails';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductRequest from '../components/ProductRequest';
import Sidebar from '../components/Sidebar';
// import Skeleton from '../components/Skeleton';
import VegCart from '../components/VegCart';

const Search = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    id === undefined && navigate('/');

    const [products, setProducts] = useState([])
    // eslint-disable-next-line
    const [skip, setSkip] = useState(0)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(102)

    useEffect(() => {
        fetch(`https://shwapno.up.railway.app/products/${skip}/${limit}?search=${id}`)
            .then(response => response.json())
            .then(data => setProducts(data.products))
    }, [id, skip, limit])

    return (
        <section style={{ minHeight: '100vh' }}>
            <Navbar searchKey={id} />

            <div style={{ margin: '0', padding: '0' }} className="container-fluid row">
                <div style={{ padding: '0' }} className="col-lg-2">
                    <div style={{ top: '70px' }} className="sticky-top">
                        <Sidebar />
                    </div>
                </div>

                <div className="col-lg-10">
                    <h1 className='fs-6 text-center text-muted pt-3'>Search result for: <b>{id}</b></h1>
                    <div className="row justify-content-center align-items-center mt-3">
                        {
                            products.length > 0 ?
                                products.map((product, index) =>
                                    // col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center align-items-center 
                                    <div key={index + 1} className="col-md-3 col-sm-4 col-6 d-flex align-items-center">
                                        <ProductCard product={product} />
                                    </div>
                                )
                                :
                                <div className="mt-5">
                                    <h2 className='fs-6 text-center'>Your search <span className="text-danger">{id}</span> did not match any products</h2>
                                    <button className='btn-confirm-order mx-auto d-block text-white fw-bold' data-bs-toggle="modal" data-bs-target="#staticBackdrop">REQUEST ITEM</button>
                                </div>
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