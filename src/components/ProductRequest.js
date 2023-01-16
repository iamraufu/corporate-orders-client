import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import messageImage from '../images/message.svg'
import whatsappImage from '../images/whatsapp.svg'

const ProductRequest = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [unit, setUnit] = useState('')

    const onSubmit = data => {

        const requested_product = {
            description: data.description,
            brand: data.brand,
            quantity: data.quantity + unit,
            number: data.number,
            email: data.email
        }
        console.log(requested_product);
    }
    return (
        <section className='p-2'>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">

                        <div style={{ borderBottom: 'none' }} className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">Product Request</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body px-5 ">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input placeholder='Write Description' type="text" className="form-control p-2" {...register("description", { required: true })} />
                                    {errors.description && <span className='text-danger'>Description required</span>}
                                </div>

                                <div className="row justify-content-between align-items-center">
                                    <div className="form-group col-md-5 mt-3">
                                        <input placeholder='Brand' type="text" className="form-control p-2" {...register("brand", { required: true })} />
                                        {errors.brand && <span className='text-danger'>Brand required</span>}
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
                                            <option value="Piece">Piece</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <div className="form-group w-100 me-3">
                                        <input placeholder='Corporate Number' type="number" className="form-control p-2" {...register("number", { required: true })} />
                                        {errors.number && <span className='text-danger'>Number required</span>}
                                    </div>

                                    <div className="form-group w-100 ms-3">
                                        <input placeholder='Email ID' type="email" className="form-control p-2" {...register("email", { required: true })} />
                                        {errors.email && <span className='text-danger'>Email required</span>}
                                    </div>
                                </div>

                                <div className="my-3">
                                    <button className='btn-email'><img className='img-fluid' src={messageImage} alt="send email" /> Send Email</button>
                                    <button className='btn-message'><img className='img-fluid' src={whatsappImage} alt="send message" /> Send Message</button>
                                </div>

                                <input className='btn-confirm-order px-5 my-3 mx-auto d-block text-white fw-bold rounded' type="submit" value='Order Request' />
                            </form>


                        </div>

                        {/* <div style={{ borderTop: 'none' }} className="modal-footer">
                            <button type="button" className="btn btn-dark btn-sm" data-bs-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRequest;