import React from 'react';
import vegCart from '../images/veg_cart.png'

const VegCart = () => {
    return (
        <div id='view_cart' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='position-fixed mt-2'>
            <div
                style={{ top: '0', right: '0', cursor: 'pointer' }} className="position-absolute pe-3">
                <img className='' src={vegCart} alt="view cart" />
                <p style={{ color: '#BA1E1E', fontSize: '10px' }}>View Cart</p>
            </div>
        </div>
    );
};

export default VegCart;