import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchMyOrder = async () => {
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
      <div className="container mx-auto px-4 py-6">
        <div className="text-3xl font-semibold text-center mb-8">My Orders</div>
        <div className="grid gap-6">

          {Object.keys(orderData).length !== 0 ? (
            Array(orderData).map((data, dataIndex) => (
              data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item, index) => (
                  <div key={`${dataIndex}-${index}`} className="space-y-4">
                    {item[0].Order_date && (
                      <div className="mt-6">
                        <h5 className="text-lg font-medium">
                          Order Date: {new Date(item[0].Order_date).toLocaleString()}
                        </h5>
                        <hr className="border-gray-300" />
                      </div>
                    )}
                    {item[0].finalPrice && (
                      <div>
                        <h5 className="text-lg font-medium">
                          Your Order Value: ₹{item[0].finalPrice}/-
                        </h5>
                        <hr className="border-gray-300" />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {item.map((arrayData, idx) => {
                        if (arrayData && arrayData.name) {
                          return (
                            <div key={idx} className=" rounded-lg shadow-md overflow-hidden">
                              <img
                                src={arrayData.img}
                                alt="Order Item"
                                className="w-full h-32 object-cover"
                                loading='lazy'
                              />
                              <div className="p-4">
                                <h5 className="text-lg font-semibold">{arrayData.name}</h5>
                                <div className="flex justify-between text-sm mt-2">
                                  <span>{arrayData.qty} x {arrayData.size}</span>
                                  <span className="text-green-700 font-semibold">₹{arrayData.price}/-</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))
                : null
            ))
          ) : (
            <div className="text-center text-lg text-gray-600">No orders found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}