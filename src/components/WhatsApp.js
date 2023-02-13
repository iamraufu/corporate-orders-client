import React from 'react';
import wapp from '../images/whatsapp.svg';

const WhatsApp = () => {
    return (
        <div style={{ bottom: '0', right: '0' }} className="position-fixed p-3">
            <a href="https://wa.me/+8801313055500" target='_blank' rel="noreferrer"><img width={50} className='img-fluid' src={wapp} alt="Click to Send Whats App Message" /></a>
        </div>
    );
};

export default WhatsApp;