import React from 'react';
import { CSVLink } from "react-csv";
import downloadImage from '../images/download.png';

const ToCSV = ({ data }) => {

    const products = [...data.products, ...data.requested_products]

    return (
        <CSVLink
            data={products}
            filename={`${data.client_id}_${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.csv`}
            className="ps-2"
            target="_blank"
        >
            <img width={25} className='img-fluid download-icon' src={downloadImage} alt="download" />
        </CSVLink>
    );
};

export default ToCSV;