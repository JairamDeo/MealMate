import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart, useDispatchCart } from '../components/ContextReduce';
import { MdDelete } from "react-icons/md";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  let navigate = useNavigate();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  if (data.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {!showSuccessAnimation && (
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      )}
      {showSuccessAnimation && (
        <div className="success-animation text-center">
          <img src="/delivery-man.gif" alt="Login Successful" className="success-gif" />
          <h3>Your Order has been Placed Successfully</h3>
        </div>
      )}
    </div>
    )
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
  
    let response = await fetch("http://localhost:5000/api/orderData", {
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
      setShowSuccessAnimation(true); // Show the success animation
      dispatch({ type: "DROP" }); // Clear the cart
  
      // Hide the success animation after 2 seconds
      setTimeout(() => {
        setShowSuccessAnimation(false);
        navigate("/myorder");
      }, 2000);

    }
  }

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><MdDelete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>

        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>

    </div>
  )
}
//original code