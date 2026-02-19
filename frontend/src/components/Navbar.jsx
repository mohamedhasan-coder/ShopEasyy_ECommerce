import { Link } from "react-router-dom";
import { Search, ShoppingBag, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
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

          {/* Register */}
          <Link 
            to="/register" 
            className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <User size={18} />
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 