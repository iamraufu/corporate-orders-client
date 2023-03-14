import logo from '../images/logo.jpg'

const ToPrint = ({ order }) => {

    return (
        <div style={{ minHeight: '100vh', display: 'none' }} id={`printTable-${order._id}`}>
            <img style={{ maxWidth: '100%', height: 'auto' }} src={logo} alt="logo" />
            <h1 style={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'center', margin: '0.5rem 0' }}>{order.user.company_name}</h1>
            <h2 style={{ fontSize: '0.75rem', textAlign: 'center', margin: '0.5rem 0' }}>{order.user.address}</h2>
            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0' }}>Company ID: {order.client_id}</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0' }}>Phone: {order.phone}</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0' }}>Client Name: {order.user.primary_client_name}</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0' }}>Email: {order.email}</p>

            <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', margin: '1rem 0' }}>{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>

            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ fontSize: '0.75rem', width: '60px', border: '1px solid black', borderRight: 'none', textAlign: 'left', padding: '0.5rem 0.75rem' }}>Serial</th>
                        <th style={{ fontSize: '0.75rem', border: '1px solid black', borderRight: 'none', textAlign: 'left', padding: '0.5rem 0.75rem' }} className='fw-bold' scope="col">Code</th>
                        <th style={{ fontSize: '0.75rem', border: '1px solid black', borderRight: 'none', textAlign: 'left', padding: '0.5rem 0.75rem' }} className='fw-bold' scope="col">Category</th>
                        <th style={{ fontSize: '0.75rem', border: '1px solid black', borderRight: 'none', textAlign: 'left', padding: '0.5rem 0.75rem' }} className='fw-bold' scope="col">Division</th>
                        <th style={{ fontSize: '0.75rem', border: '1px solid black', borderRight: 'none', textAlign: 'left', padding: '0.5rem 0.75rem' }} className='fw-bold' scope="col">Product</th>
                        <th style={{ fontSize: '0.75rem', border: '1px solid black', textAlign: 'left', padding: '0.5rem 0.75rem' }} className='fw-bold' scope="col">Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td style={{ backgroundColor: 'lightgrey', textAlign: 'center', fontWeight: '700', fontSize: '1rem' }} colSpan={6}>Website's Items</td>
                    </tr>
                    {
                        order.products.map((item, index) =>
                            <tr key={item.code} style={{ padding: '10px' }}>
                                <td style={{ fontSize: '12px', width: '30px', borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px' }}>{index + 1}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px' }}>{item.code}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px' }}>{item.category}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px' }}>{item.division}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', padding: '5px' }}>{item.name}</td>
                                <td style={{ fontSize: '12px', borderBottom: '1px solid black', padding: '5px' }}>{item.count}</td>
                            </tr>
                        )}
                    {
                        order.requested_products.length > 0 &&
                        <tr>
                            <td style={{ backgroundColor: 'lightgrey', textAlign: 'center', fontWeight: '700', fontSize: '1rem' }} colSpan={6} className='text-center fs-5 fw-bold'>Requested Items</td>
                        </tr>
                    }
                    {
                        order.requested_products.length > 0 &&
                        <tr>
                            <th style={{ fontSize: '12px', width: '60px', borderRight: '1px solid black', borderBottom: '1px solid black', }}>Serial</th>
                            <th style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', }} className='fw-bold' scope="col">Name</th>
                            <th style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', }} className='fw-bold' scope="col">Brand</th>
                            <th style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', }} className='fw-bold' scope="col">Quantity</th>
                            <th style={{ fontSize: '12px', borderRight: '1px solid black', borderBottom: '1px solid black', }} className='fw-bold' scope="col">Description</th>
                            <th style={{ fontSize: '12px', borderBottom: '1px solid black', }} className='fw-bold' scope="col">Unit</th>
                        </tr>
                    }

                    {
                        order.requested_products.length > 0 &&
                        order.requested_products.map((item, index) =>
                            <tr key={index}>
                                <td style={{ fontSize: '12px', width: '60px', borderRight: '1px solid black', padding: '0.5rem 0.75rem' }}>{index + 1}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', padding: '0.5rem 0.75rem' }}>{item.title}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', padding: '0.5rem 0.75rem' }}>{item.brand}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', padding: '0.5rem 0.75rem' }}>{parseInt(item.quantity)}</td>
                                <td style={{ fontSize: '12px', borderRight: '1px solid black', padding: '0.5rem 0.75rem' }}>{item.description}</td>
                                <td style={{ fontSize: '12px', padding: '0.5rem 0.75rem' }}>{item.unit}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
export default ToPrint;