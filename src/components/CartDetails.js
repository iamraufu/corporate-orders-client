import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import vegCartImage from '../images/veg_cart.png';
import CartProducts from './CartProducts';
import useAuth from '../hooks/useAuth';

const CartDetails = () => {

    const navigate = useNavigate();

    const { cart, requestedProduct } = useAuth()

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (cart?.length + requestedProduct?.length > 0) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [cart?.length, requestedProduct?.length])

    const handleClick = () => {
        if (cart?.length + requestedProduct?.length > 0) {
            navigate('/shipping');
        }
        else {
            Swal.fire(
                'Error!',
                'Your Cart is Empty!',
                'error'
            )
        }
    }

    return (
        <div className="offcanvas offcanvas-end p-0" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div style={{ paddingBottom: '0' }} className="offcanvas-header">
                <h5 id="offcanvasRightLabel" className='fw-bold text-center fs-6'><img width={30} src={vegCartImage} alt="cart details" className='img-fluid pb-3 me-1' />Total Order</h5>
                <button type="button" className="btn-close text-reset mb-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div style={{ padding: '0' }} className="offcanvas-body">
                <div style={{ marginBottom: '8rem' }} className="">
                    {
                        cart?.length > 0 &&
                        cart.map(product =>
                            <CartProducts key={product._id} product={product} />
                        )
                    }

                    {
                        requestedProduct?.length > 0 &&
                        <div className="">
                            <h2 style={{ fontSize: '18px' }} className='fw-bold ps-2 pt-2'>Requested Products</h2>
                            {
                                requestedProduct.map((product, index) =>
                                    <div style={{ borderBottom: '1px solid #E4DADA' }} key={index} className="ps-2 py-1">
                                        <div className="d-flex justify-content-between align-items-center px-1">
                                            <div className="fs-6"><h2 style={{ fontSize: '13px' }} className="">{product.title}</h2></div>
                                            <div className="fs-6"><h2 style={{ fontSize: '15px' }} className=""><small>{product.quantity} {product.unit}</small></h2></div>
                                        </div>
                                        <div className="px-1"><h2 style={{ fontSize: '13px' }} className="">{product.description}</h2></div>
                                        <div className="px-1"><h2 style={{ fontSize: '13px' }} className=""><small>{product.brand}</small></h2></div>
                                    </div>
                                )}
                        </div>
                    }
                </div>

                <div style={{ boxShadow: '0 5px 15px #c4c4c44d', bottom: '0', backgroundColor: '#F9E3E3' }} onClick={() => handleClick()} className="position-absolute mx-auto d-block w-100 p-2">
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <div className="">
                            {
                                cart?.length + requestedProduct?.length === 0 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>No Product</h5>
                            }

                            {
                                cart?.length + requestedProduct?.length === 1 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>1 Product</h5>
                            }
                            {
                                cart?.length + requestedProduct?.length > 1 && <h5 style={{ fontSize: '12px' }} className='text-center fw-bold'>{cart?.length + requestedProduct?.length} Products</h5>
                            }
                        </div>
                    </div>
                    <button disabled={disabled} className='float-end btn-confirm-order'>Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;