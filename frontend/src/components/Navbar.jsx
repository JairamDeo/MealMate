import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReduce";
import { ShoppingCart } from "lucide-react";

// Lazy load Modal and Cart
const Modal = lazy(() => import("../Modal"));
const Cart = lazy(() => import("../screens/Cart"));

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = useCallback(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    menu.classList.toggle("translate-x-full");
    menu.classList.toggle("translate-x-0");
  }, []);

  const handleClickOutside = useCallback((event) => {
    const menu = mobileMenuRef.current;
    const button = buttonRef.current;
    if (
      menu &&
      button &&
      !menu.classList.contains("translate-x-full") &&
      !menu.contains(event.target) &&
      !button.contains(event.target)
    ) {
      menu.classList.add("translate-x-full");
      menu.classList.remove("translate-x-0");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }, [navigate]);

  const CartBadge = ({ count }) => (
    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#DC3545] rounded-full ml-2">
      {count}
    </span>
  );

  return (
    <nav className="bg-[#1E1E1E] text-white shadow-md sticky top-0 z-50 border-b border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-3xl font-serif font-semibold text-white hover:text-[#0D6EFD] transition duration-300"
            >
              MealMate
            </Link>
            <Link
              to="/"
              className="text-lg font-medium text-white hover:text-[#0DCAF0] transition duration-300"
            >
              Home
            </Link>
          </div>

          {/* Mobile Cart & Hamburger */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setCartView(true)}
              className="relative text-white hover:text-[#0DCAF0] focus:outline-none"
              aria-label="Open Cart"
            >
              <ShoppingCart size={24} />
              {data.length > 0 && <CartBadge count={data.length} />}
            </button>

            <button
              ref={buttonRef}
              onClick={handleToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#0DCAF0] hover:bg-[#2C2C2C] focus:outline-none"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {localStorage.getItem("authToken") && (
              <Link
                to="/myorder"
                className="text-lg font-medium text-white hover:text-[#0DCAF0] transition duration-300"
              >
                My Orders
              </Link>
            )}

            {!localStorage.getItem("authToken") ? (
              <div className="flex space-x-3 ml-6">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#FFFFFF] text-[#1E1E1E] rounded-md font-semibold hover:bg-[#6C757D] hover:text-white transition duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#FFFFFF] text-[#1E1E1E] rounded-md font-semibold hover:bg-[#6C757D] hover:text-white transition duration-300"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-6">
                <button
                  onClick={() => setCartView(true)}
                  className="relative p-2 bg-[#0DCAF0] text-[#212529] rounded-md font-semibold hover:bg-[#F8F9FA] transition duration-300 flex items-center"
                  aria-label="Open Cart"
                >
                  <ShoppingCart size={24} />
                  {data.length > 0 && <CartBadge count={data.length} />}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#DC3545] text-white rounded-md font-semibold hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed top-0 right-0 w-1/2 h-full bg-[#1E1E1E] border-l border-[#2C2C2C] translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto pt-16 px-4 pb-4 shadow-xl z-40"
      >
        <Link
          to="/"
          className="block px-3 py-2 text-white hover:bg-[#2C2C2C] rounded-md mb-2 transition duration-300"
          onClick={handleToggle}
        >
          Home
        </Link>

        {localStorage.getItem("authToken") && (
          <Link
            to="/myorder"
            className="block px-3 py-2 text-white hover:bg-[#2C2C2C] rounded-md mb-2 transition duration-300"
            onClick={handleToggle}
          >
            My Orders
          </Link>
        )}

        {!localStorage.getItem("authToken") ? (
          <>
            <Link
              to="/login"
              className="block px-3 py-2 mb-2 bg-[#FFFFFF] text-[#1E1E1E] font-semibold rounded-md hover:bg-[#6C757D] hover:text-white transition duration-300"
              onClick={handleToggle}
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-[#FFFFFF] text-[#1E1E1E] font-semibold rounded-md hover:bg-[#6C757D] hover:text-white transition duration-300"
              onClick={handleToggle}
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                handleLogout();
                handleToggle();
              }}
              className="px-3 py-2 bg-[#DC3545] text-white rounded-md font-semibold hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* ✅ Lazy Loaded Modal with Cart */}
      {cartView && (
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            </div>
          }
        >
          <Modal onClose={() => setCartView(false)}>
            <Cart />
          </Modal>
        </Suspense>
      )}
    </nav>
  );
}