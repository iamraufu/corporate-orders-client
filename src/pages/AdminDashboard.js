import React, { useEffect, useState } from 'react';
import printImage from '../images/print.png'
import ToCSV from '../components/ToCSV';
import Header from '../components/Header';
import ToPrint from '../components/ToPrint';
import Swal from 'sweetalert2';

const AdminDashboard = () => {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        fetch('https://corporate-orders-server.onrender.com/orders')
            .then(Response => Response.json())
            .then(data => setOrders(data.result))
    }, [])

    const handlePrint = (id) => {
        const printTable = document.getElementById(`printTable-${id}`);
        printTable.style.display = 'block';
        const newWin = window.open('Data');
        newWin.document.write(printTable.outerHTML);
        newWin.document.close();
        newWin.print();
        printTable.style.display = 'none';
        newWin.close();
    }

    const handleUpdate = id => {
        const details = { 
            status: status
        }
        fetch(`https://corporate-orders-server.onrender.com/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(data => {
                data.status === true &&
                    Swal.fire({
                        icon: 'success',
                        title: `${data.message}`,
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload()
                            }
                        })
            })
    }    

    return (
        <div className='container'>
            <Header />

            <div className="d-none d-lg-block">
                <div style={{ borderBottom: '1px solid #46A4F2', backgroundColor: '#F6F6F6' }} className="d-flex justify-content-between align-items-center py-1 sticky-top">
                    <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold ps-2">Date</div>
                    <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold ps-2">Client Id</div>
                    <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">Email</div>
                    <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold">Client Name</div>
                    <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold">Phone</div>
                    <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">Company Name</div>
                    <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold text-center">Status</div>
                    <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">Download / Print</div>
                </div>

                {
                    orders.length > 0 &&
                    orders.map(order =>
                        <div key={order._id} className="">
                            <div className="d-flex px-2 py-1">
                                <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold ps-2">{order.client_id}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">{order.email}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold">{order.user.primary_client_name}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-1 fw-bold">{order.phone}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">{order.user.company_name}</div>
                                <div style={{ fontSize: '11px' }} className="col-md-2 fw-bold">
                                    {
                                        order.status === 'Pending' && <p style={{ backgroundColor: '#f7d635', width: '120px', height: '30px', borderRadius: '5px' }} className='d-flex justify-content-center align-items-center my-0 fw-bold mx-auto d-block'>{order.status}</p>
                                    }

                                    {
                                        order.status === 'Acknowledged' && <p style={{ backgroundColor: '#a4dd74', width: '120px', height: '30px', borderRadius: '5px' }} className='d-flex justify-content-center align-items-center my-0 fw-bold mx-auto d-block'>{order.status}</p>
                                    }

                                    {
                                        order.status === 'Delivered' && <p style={{ backgroundColor: '#5454e8', width: '120px', height: '30px', borderRadius: '5px' }} className='d-flex justify-content-center align-items-center my-0 fw-bold mx-auto d-block text-white'>{order.status}</p>
                                    }
                                </div>
                                <div style={{ cursor: 'pointer' }} className="col-md-1 d-flex justify-content-between align-items-center">
                                {/* <form onSubmit={handleSubmit(onSubmit)} className='d-flex'> */}
                                    <select id='status' style={{ backgroundColor: '#D9D9D9', fontSize:'10px' }} onChangeCapture={(e) => 
                                    // setStatus(document.getElementById('status').querySelector('option:checked').value)
                                    setStatus(e.target.value)
                                } className='form-select' aria-label=".form-select-sm example" required
                                    // {...register("status", { required: true })}
                                    >
                                        <option value="" defaultValue>Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Acknowledged">Acknowledged</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <div onClick={() => handleUpdate(order._id)} className="">✔️</div>
                                    {/* <input style={{background:'none', border:'none'}} type="submit" value='✔️' /> */}
                                {/* </form> */}
                                </div>
                                <div style={{ fontSize: '11px' }} className="col-md-1 d-flex align-items-center">
                                    <ToCSV data={order} />
                                    <img onClick={() => handlePrint(order._id)} width={20} className='img-fluid ms-2' src={printImage} alt="print" />
                                </div>
                            </div>
                            <ToPrint order={order} />
                        </div>
                    )
                }
            </div>

            <div className="uploaded-items-container-sm px-2 mt-3 d-lg-none">
                <div style={{ borderBottom: '1px solid #46A4F2', backgroundColor: '#F6F6F6' }} className="d-flex justify-content-between align-items-center py-2 sticky-top">
                    <div style={{ fontSize: '12px' }} className="col-8 text-brand fw-bold ps-2">Article</div>
                    <div style={{ fontSize: '9px' }} className="col-2 text-brand fw-bold ps-2">Today Delivered</div>
                    <div style={{ fontSize: '9px' }} className="col-2 text-brand fw-bold ps-2">Short Delivered</div>
                </div>


            </div>

        </div>
    );
};

export default AdminDashboard;