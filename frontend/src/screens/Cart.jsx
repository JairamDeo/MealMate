import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useCart, useDispatchCart } from '../components/ContextReduce';
import { MdDelete } from "react-icons/md";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let navigate = useNavigate();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        {!showSuccessAnimation && (
          <div className="m-5 w-full text-center text-xl md:text-2xl font-semibold text-gray-700">
            The Cart is Empty!
          </div>
        )}
        {showSuccessAnimation && (
          <div className="success-animation text-center">
            <img
              src="/delivery-man.gif"
              alt="Login Successful"
              className="mx-auto mb-4 max-w-xs w-full"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold text-green-600">
              Your Order has been Placed Successfully
            </h3>
          </div>
        )}
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    try {
      let userEmail = Cookies.get("userEmail");

      let response = await fetch(`${backendUrl}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toLocaleString(),
          finalPrice: totalPrice
        })
      });

      if (response.status === 200) {
        setShowSuccessAnimation(true);
        dispatch({ type: "DROP" });
        setTimeout(() => {
          setShowSuccessAnimation(false);
          navigate("/myorder");
        }, 2000);
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  }


  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md shadow-md table-auto">
          <thead className="bg-green-100 text-green-800 text-lg font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-green-300 text-left">#</th>
              <th className="px-4 py-3 border-b border-green-300 text-left">Name</th>
              <th className="px-4 py-3 border-b border-green-300 text-center">Quantity</th>
              <th className="px-4 py-3 border-b border-green-300 text-center">Option</th>
              <th className="px-4 py-3 border-b border-green-300 text-right">Amount</th>
              <th className="px-4 py-3 border-b border-green-300"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="text-white">
                <td className="px-4 py-3 border-b border-gray-200">{index + 1}</td>
                <td className="px-4 py-3 border-b border-gray-200">{food.name}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{food.qty}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{food.size}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-right">{food.price}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label={`Remove ${food.name} from cart`}
                    onClick={() => dispatch({ type: "REMOVE", index: index })}
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <h1 className="text-2xl font-semibold text-white">
          Total Price: <span className="text-green-600">{totalPrice}/-</span>
        </h1>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleCheckOut}
          className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none text-white font-semibold py-3 px-8 rounded-md transition"
          aria-label="Check Out"
        >
          Check Out
        </button>
      </div>
    </div>
  )
}
