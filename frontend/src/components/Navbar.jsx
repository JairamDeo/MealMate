import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from '../Modal';
import Cart from "../screens/Cart";
import { useCart } from "./ContextReduce";

export default function Navbar() {

  let data = useCart(); 
  const [cartView, setCartView] = useState(false);

  const navbarRef = useRef(null); 
  const buttonRef = useRef(null); 

  const handleToggle = () => {
    if (navbarRef.current.classList.contains("hidden")) {
      navbarRef.current.classList.remove("hidden");
    } else {
      navbarRef.current.classList.add("hidden");
    }
  };

  const handleClickOutside = (event) => {
    if (
      !navbarRef.current.classList.contains("hidden") &&
      !navbarRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      navbarRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Tailwind Badge component for cart count
  const CartBadge = ({ count }) => (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full ml-2">
      {count}
    </span>
  );

  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-serif italic font-semibold text-white hover:text-green-300 transition"
          >
            MealMate
          </Link>

          {/* Hamburger menu button (small screens) */}
          <button
            ref={buttonRef}
            onClick={handleToggle}
            type="button"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white lg:hidden"
          >
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Menu */}
          <div
            ref={navbarRef}
            className="hidden lg:flex lg:items-center lg:space-x-6"
            id="navbarNavAltMarkup"
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-white hover:bg-green-600 hover:text-white transition"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") && (
                <li>
                  <Link
                    to="/myorder"
                    className="block px-3 py-2 rounded-md text-white hover:bg-green-600 hover:text-white transition"
                    aria-current="page"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="flex space-x-3 ml-6">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold hover:bg-green-100 transition"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold hover:bg-green-100 transition"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-6">
                <button
                  onClick={() => setCartView(true)}
                  className="relative px-4 py-2 bg-white text-green-700 rounded-md font-semibold hover:bg-green-100 transition flex items-center"
                >
                  <span>My Cart</span>
                  {data.length > 0 && <CartBadge count={data.length} />}
                </button>

                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-red-600 rounded-md font-semibold hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu (small screens) */}
      <div ref={navbarRef} className="lg:hidden hidden px-4 pt-2 pb-3 space-y-1 bg-green-700">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-white hover:bg-green-600 hover:text-white transition"
          aria-current="page"
          onClick={() => navbarRef.current.classList.add("hidden")}
        >
          Home
        </Link>

        {localStorage.getItem("authToken") && (
          <Link
            to="/myorder"
            className="block px-3 py-2 rounded-md text-white hover:bg-green-600 hover:text-white transition"
            aria-current="page"
            onClick={() => navbarRef.current.classList.add("hidden")}
          >
            My Orders
          </Link>
        )}

        {!localStorage.getItem("authToken") ? (
          <>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md bg-white text-green-700 font-semibold hover:bg-green-100 transition"
              onClick={() => navbarRef.current.classList.add("hidden")}
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md bg-white text-green-700 font-semibold hover:bg-green-100 transition"
              onClick={() => navbarRef.current.classList.add("hidden")}
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setCartView(true);
                navbarRef.current.classList.add("hidden");
              }}
              className="relative px-3 py-2 bg-white text-green-700 rounded-md font-semibold hover:bg-green-100 transition flex items-center"
            >
              <span>My Cart</span>
              {data.length > 0 && <CartBadge count={data.length} />}
            </button>
            <button
              onClick={() => {
                handleLogout();
                navbarRef.current.classList.add("hidden");
              }}
              className="px-3 py-2 bg-white text-red-600 rounded-md font-semibold hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
