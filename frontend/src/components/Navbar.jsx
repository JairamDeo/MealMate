import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from "../screens/Cart";
import { useCart } from "./ContextReduce";
export default function Navbar() {

  let data = useCart(); 
  const [cartView, setCartView] = useState(false);


  const navbarRef = useRef(null); // Ref for the navbar collapse
  const buttonRef = useRef(null); // Ref for the toggle button

  const handleToggle = () => {
    if (navbarRef.current.classList.contains("show")) {
      navbarRef.current.classList.remove("show");
    } else {
      navbarRef.current.classList.add("show");
    }
  };

  const handleClickOutside = (event) => {
    // Close the menu if clicked outside the navbar or the toggle button
    if (
      navbarRef.current.classList.contains("show") &&
      !navbarRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      navbarRef.current.classList.remove("show");
    }
  };

  useEffect(() => {
    // Add a click event listener to detect clicks outside
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            MealMate
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggle}
            ref={buttonRef} // Reference the toggle button
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
            ref={navbarRef} // Reference the navbar collapse
          >
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                My Orders
              </Link>
            </li>              
              :""}

            </ul>
            {(!localStorage.getItem("authToken"))?
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>

                  <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                </div>  
            :
            <div>
              <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                My Cart {" "}
                
                {/* if there is 0 item in cart it wont show badge but if there is more than 0 it will show badge of respective no. */}
                {data.length > 0 && <Badge pill bg="danger">{data.length}</Badge>} 
              </div>
              {cartView? <Modal onClose={()=>{setCartView(false)}} ><Cart/></Modal> : null}
              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
            </div>    
            }   
          </div>
        </div>
      </nav>
    </div>
  );
}
