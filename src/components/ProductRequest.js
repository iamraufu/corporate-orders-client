import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';

const ProductRequest = () => {

    const {setRequestedProduct} = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [unit, setUnit] = useState('')
    let reqProduct = localStorage.getItem('requested-product')
    let orderRequest = []

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
        if(reqProduct){
            orderRequest = JSON.parse(localStorage.getItem('requested-product'))
        }
        orderRequest.push(product)
        setRequestedProduct(orderRequest)
        localStorage.setItem('requested-product', JSON.stringify(orderRequest))
        document.getElementById('product_request_form').reset()
        document.getElementById('product_request_close_btn').click()
        document.getElementById('view_cart').click()
    }

    return (
        <section className='p-2'>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div style={{ borderBottom: 'none' }} className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">Add Product Request</h1>
                            <button id='product_request_close_btn' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body px-5 ">
                            <form id='product_request_form' onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input placeholder='Title' type="text" className="form-control p-2" {...register("title", { required: true })} />
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRequest;