import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReduce';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let navigate = useNavigate(); // ✅ initialize navigate

    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [showModal, setShowModal] = useState(false); // 🔐 Modal state

    let finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async () => {
        const authToken = Cookies.get("authToken");

        if (!authToken) {
            setShowModal(true); // 🔐 Show modal if not logged in
            return;
        }

        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, img: props.foodItem.img });
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.foodItem.img,
                });
            }
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img,
            });
        }
    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="mt-3 mx-auto max-w-[18rem] max-h-[360px] shadow border rounded overflow-hidden">
                <img
                    src={props.foodItem.img}
                    alt={props.foodItem.name}
                    className="w-full h-[170px] object-fill"
                    loading="lazy"
                />
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{props.foodItem.name}</h5>
                    <div className="w-full flex flex-wrap items-center">
                        <select
                            className="m-2 h-full bg-green-600 text-white rounded px-2 py-1"
                            onChange={(e) => setQty(e.target.value)}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select
                            className="m-2 h-full bg-green-600 text-white rounded px-2 py-1"
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>

                        <div className="inline-block h-full text-lg font-medium ml-2">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* 🔐 Modal for not logged-in users */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center shadow-lg">
                        <h2 className="text-xl font-semibold mb-3 text-red-600">🚫 You're not logged in!</h2>
                        <p className="mb-4 text-gray-700">Please log in to add items to your cart.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/login")} // ✅ proper navigation
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Go to Login
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(Card);