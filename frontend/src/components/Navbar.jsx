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
  const navigate = useNavigate();

  const handleToggle = () => {
    navbarRef.current.classList.toggle("hidden");
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
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const CartBadge = ({ count }) => (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-dark-danger rounded-full ml-2">
      {count}
    </span>
  );

  return (
    <nav className="bg-dark-surface text-white shadow-md sticky top-0 z-50 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Home */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-3xl font-serif italic font-semibold text-white hover:text-dark-primary transition"
            >
              MealMate
            </Link>
            <Link
              to="/"
              className="text-lg font-medium text-white hover:text-dark-info transition"
            >
              Home
            </Link>
          </div>

          {/* Hamburger */}
          <button
            ref={buttonRef}
            onClick={handleToggle}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-dark-info hover:bg-dark-border focus:outline-none lg:hidden"
          >
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div ref={navbarRef} className="hidden lg:flex lg:items-center lg:space-x-6">
            {localStorage.getItem("authToken") && (
              <Link
                to="/myorder"
                className="text-lg font-medium text-white hover:text-dark-info transition"
              >
                My Orders
              </Link>
            )}

            {!localStorage.getItem("authToken") ? (
              <div className="flex space-x-3 ml-6">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-dark-white text-dark-surface rounded-md font-semibold hover:bg-dark-muted transition"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-dark-white text-dark-surface rounded-md font-semibold hover:bg-dark-muted transition"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-6">
                <button
                  onClick={() => setCartView(true)}
                  className="relative px-4 py-2 bg-dark-info text-dark-dark rounded-md font-semibold hover:bg-dark-light transition flex items-center"
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
                  className="px-4 py-2 bg-dark-danger text-white rounded-md font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={navbarRef} className="lg:hidden hidden px-4 pt-2 pb-3 space-y-1 bg-dark-surface border-t border-dark-border">
        <Link
          to="/"
          className="block px-3 py-2 text-white hover:bg-dark-border rounded-md"
          onClick={() => navbarRef.current.classList.add("hidden")}
        >
          Home
        </Link>

        {localStorage.getItem("authToken") && (
          <Link
            to="/myorder"
            className="block px-3 py-2 text-white hover:bg-dark-border rounded-md"
            onClick={() => navbarRef.current.classList.add("hidden")}
          >
            My Orders
          </Link>
        )}

        {!localStorage.getItem("authToken") ? (
          <>
            <Link
              to="/login"
              className="block px-3 py-2 bg-dark-white text-dark-surface font-semibold rounded-md hover:bg-dark-muted transition"
              onClick={() => navbarRef.current.classList.add("hidden")}
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-dark-white text-dark-surface font-semibold rounded-md hover:bg-dark-muted transition"
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
              className="relative px-3 py-2 bg-dark-info text-dark-dark rounded-md font-semibold hover:bg-dark-light transition"
            >
              <span>My Cart</span>
              {data.length > 0 && <CartBadge count={data.length} />}
            </button>
            <button
              onClick={() => {
                handleLogout();
                navbarRef.current.classList.add("hidden");
              }}
              className="px-3 py-2 bg-dark-danger text-white rounded-md font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
