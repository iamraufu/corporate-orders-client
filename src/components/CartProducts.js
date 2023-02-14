import React from 'react';
import useAuth from '../hooks/useAuth';

const CartProducts = ({ product }) => {

    const { removeFromCart, addToDB, addFive, addTen } = useAuth()

    return (
        <div style={{ borderBottom: '1px solid #E4DADA' }} className="py-2">
            <div className="d-flex justify-content-between align-item-center px-2">
                <div onClick={() => addToDB(product)} style={{ width: '18px', height: '18px', 
                backgroundColor: '#D9D9D9', 
                cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">+</div>
                <div className="col-md-8 fs-6"><h2 style={{ fontSize: '13px' }} className="">{product.name}</h2></div>
                <div onClick={() => addFive(product)} style={{ fontSize: '11px',color:'white', height: '28px', width: '28px', backgroundColor: '#198754', borderRadius: '50%', cursor: 'pointer', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">5Kg</div>
                <div onClick={() => addTen(product)} style={{ fontSize: '11px',color:'white', height: '28px', width: '28px', backgroundColor: '#198754', borderRadius: '50%', cursor: 'pointer', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} className="col-md-1 d-flex justify-content-center align-items-center fw-bold">10Kg</div>
            </div>

            <div className="d-flex justify-content-between align-item-center px-2 mt-2">
                <div onClick={() => removeFromCart(product)} style={{ width: '18px', height: '18px', 
                backgroundColor: '#D9D9D9', 
                cursor: 'pointer' }} className="col-md-2 fw-bold d-flex justify-content-center align-items-center">-</div>
                <div className="col-md-6"></div>
                <div className="col-md-2"><h4 style={{ fontSize: '15px' }} className="float-end">{product?.count} Kg</h4></div>
            </div>
        </div>
    );
};

export default CartProducts;