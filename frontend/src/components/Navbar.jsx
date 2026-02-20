import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = false;

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <ShoppingBag size={28} className="text-black hover:text-blue-600 transition" />
          <span>Shop Easyy</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">Home</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/products">Products</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about">About Us</Link>
          <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact">Contact Us</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <form className="hidden sm:flex items-center border border-slate-300 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="px-3 py-2 text-sm w-40 focus:outline-none"
            />
            <button className="px-3 text-gray-400 hover:text-blue-600 transition">
              <Search size={18} />
            </button>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition">
            <ShoppingCart />
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
              6
            </span>
          </Link>

          {/* Auth Button */}
          {!isAuthenticated ? (
            <Link
              to="/register"
              className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <User size={18} />
              Register
            </Link>
          ) : (
            <Link
              to="/profile"
              className="hidden sm:flex gap-2 items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              <User size={18} />
              Profile
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 py-4 bg-white border-t shadow-lg">
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/products">
            Products
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about">
            About Us
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
