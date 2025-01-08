import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch(`${backendUrl}/api/myorderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        }).then(async (res) => {
            let response = await res.json();
            await setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='fs-1 text-center'>My Orders</div>
                <div className='row'>

                    {Object.keys(orderData).length !== 0 ? (
                        // Loop through orderData to render orders
                        Array(orderData).map((data) => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {/* Display order date if present */}
                                                {item[0].Order_date && (
                                                    <div className='m-auto mt-5'>
                                                        <h5>Order Date: {new Date(item[0].Order_date).toLocaleString()}</h5>
                                                        <hr />
                                                    </div>
                                                )}
                                                {/* Display finalPrice if present */}
                                                {item[0].finalPrice && (
                                                    <div className='m-auto'>
                                                        <h5>Your Order Value: ₹{item[0].finalPrice}/-</h5>
                                                        <hr />
                                                    </div>
                                                )}

                                                {/* Display items in a row */}
                                                <div className='row'>
                                                    {item.map((arrayData, idx) => {
                                                        // Ensure valid arrayData before rendering the card
                                                        if (arrayData && arrayData.name) {
                                                            return (
                                                                <div className='col-12 col-md-4 col-lg-3 mb-3' key={idx}>
                                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                <span className='m-1'>{arrayData.qty} x {arrayData.size}</span>
                                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                                    ₹{arrayData.price}/-
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return null; // If no valid data, return nothing (no empty card)
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })
                                    : ""
                            );
                        })
                    ) : (
                        <div className="col-12">
                            <p>No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
