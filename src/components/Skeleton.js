import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = () => {
    return (
        <div style={{ height: "120px" }} className='d-flex justify-content-between align-items-center skeleton-deck m-2 px-2'>
            {/* d-flex align-items-center */}
            {/* mt-3 */}
            <div className='cart-img-top_skeleton skeleton col-2'></div>
            <div className="col-8">
                {/* <div className='cart-img-top_skeleton skeleton'></div> */}
                {/* d-flex justify-content-between align-items-center */}
                <div className="pt-2">
                    {/* mt-4 mt-4 */}
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>
            </div>
       </div>
    );
};

export default Skeleton;