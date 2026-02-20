const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">Contact Us</h3>
          <p>Phone: +91 9043017689</p>
          <p>Email: support@shopeasyy.com</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Follow Me</h3>
          <p>Instagram • YouTube • LinkedIn</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">About</h3>
          <p>
            Providing professional e-commerce solutions to help you grow your
            online business.
          </p>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-slate-800">
        © {new Date().getFullYear()} Shop Easyy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;