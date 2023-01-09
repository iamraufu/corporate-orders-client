import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = () => {
    return (
        <div className=''>
            <div className="cart pt-4 px-3">
                <div className='cart-img-top_skeleton skeleton'></div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="skeleton skeleton-text mt-4"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;