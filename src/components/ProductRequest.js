import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';

const ProductRequest = () => {

    const { addToDB, setRequestedProduct, cart } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [unit, setUnit] = useState('')
    let reqProduct = localStorage.getItem('requested-product')
    let orderRequest = []

    const [searchedValue, setSearchedValue] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([])
    // eslint-disable-next-line
    const [skip, setSkip] = useState(0)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(400)

    const onSubmit = data => {

        const requested_product = {
            title: data.title,
            description: data.description || '',
            brand: data.brand || '',
            quantity: data.quantity,
            unit: unit,
            number: data.number,
            email: data.email
        }
        reqProductToDB(requested_product)
    }

    const reqProductToDB = product => {
        if (reqProduct) {
            orderRequest = JSON.parse(localStorage.getItem('requested-product'))
        }
        orderRequest.push(product)
        setRequestedProduct(orderRequest)
        localStorage.setItem('requested-product', JSON.stringify(orderRequest))
        document.getElementById('product_request_form').reset()
        document.getElementById('product_request_close_btn').click()
        document.getElementById('view_cart').click()
    }

    useEffect(()=> {
        if (searchedValue.length > 0) {
            const handler = setTimeout(() => {
                fetch(`https://corporateorders.herokuapp.com/products/${skip}/${limit}?search=${searchedValue}`)
                .then(response => response.json())
                .then(data => {
                    window.scrollTo(0, 0);
                    setSearchedProducts(data.products)
                })
            }, 1000)
            return () => {
                clearTimeout(handler);
            };
        }
        else {
            setSearchedProducts([])
        }
    },[skip,limit, searchedValue])

    const handleClick = (product) => {
        document.getElementById('product_request_close_btn').click()
        document.getElementById('view_cart').click()
        addToDB(product)
    }

    return (
        <section className='p-2'>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div style={{ borderBottom: 'none' }} className="modal-header mx-auto d-block">
                            <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">Add Product Request</h1>
                            <button id='product_request_close_btn' type="button" className="btn-close position-absolute top-0 end-0 m-1" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body px-5 ">
                            <form id='product_request_form' onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input placeholder='Product Name e.g. Rice, Egg, Fish etc.' onChangeCapture={(event) => setSearchedValue(event.target.value)} type="text" className="form-control p-2" {...register("title", { required: true })} />
                                    {errors.title && <span className='text-danger'>Title required</span>}
                                </div>

                                <div className="form-group mt-3">
                                    <textarea placeholder='Write Description' type="text" className="form-control p-2" {...register("description")} />
                                </div>

                                <div className="row justify-content-between align-items-center">
                                    <div className="form-group col-md-5 mt-3">
                                        <input placeholder='Brand' type="text" className="form-control p-2" {...register("brand")} />
                                    </div>

                                    <div className="form-group col-md-4 mt-3">
                                        <input placeholder='Quantity' type="number" className="form-control p-2" {...register("quantity", { required: true })} />
                                        {errors.quantity && <span className='text-danger'>Quantity required</span>}
                                    </div>

                                    <div className="col-md-3 mt-3">
                                        <select id='unit' style={{ backgroundColor: '#D9D9D9' }} onChangeCapture={(e) => setUnit(document.getElementById('unit').querySelector('option:checked').value)} className='form-select' aria-label=".form-select-sm example" required>
                                            <option value="" defaultValue>Unit</option>
                                            <option value="Kg">Kg</option>
                                            <option value="Gram">Gram</option>
                                            <option value="Litre">Litre</option>
                                            <option value="Piece">Piece</option>
                                        </select>
                                    </div>
                                </div>
                                <input className='btn-confirm-order px-5 my-3 mx-auto d-block fw-bold' type="submit" value='Add to Cart' />
                            </form>

                            {
                                searchedProducts.length > 0 && <h1 className="fs-5 fw-bold text-center">Available Products Named {searchedValue}</h1>
                            }

                            {
                                searchedProducts.length > 0 &&
                                <div style={{ maxHeight: '300px', overflow: 'auto' }} className='py-2'>
                                    {
                                        searchedProducts.map(product =>
                                            <div key={product._id} style={{ maxWidth: '400px' }} className="d-flex justify-content-between align-items-center py-1">
                                                <div style={{ fontSize: '14px' }}>{product.name}</div>
                                                {
                                                    cart.find(cart => cart.code === product.code) ?
                                                        <div style={{ fontSize: '14px' }} className="fw-bold d-flex justify-content-center align-items-center text-success">Added</div>
                                                        :
                                                        <div onClick={() => handleClick(product)} style={{ width: '18px', height: '18px', backgroundColor: '#198754', cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center text-white">+</div>
                                                }
                                            </div>
                                        )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRequest;