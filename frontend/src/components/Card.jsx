import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReduce';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = []; 
        // Check if the item already exists in the cart
        for (const item of data) {
            if (item.id === props.foodItem._id) { // Replace `foodItem` with `props.foodItem`
                food = item;
                break;
            }
        }
    
        if (!food == []) { // If the food item exists in the cart
            if (food.size === size) {
                // If size is the same, update the quantity
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, img:props.foodItem.img });
            } else if (food.size !== size) {
                // If size is different, add a new item
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img:props.foodItem.img,
                });
            }
        } else {
            // If the item doesn't exist, add it to the cart
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img:props.foodItem.img,
            });
        }
    };
    

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    return (
        <div>
            <div className="card mt-3 mx-auto"  style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} style={{ height: '170px', objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className=" m-2 h-100 bg-success rounded " onChange={(e) => setQty(e.target.value)}>

                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            }
                            )
                            }
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                            
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>

                    </div>
                    <hr></hr>
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>

                </div>
            </div>
        </div>
    )
}
// card original