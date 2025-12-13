import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo / Brand */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold">MyWebsite</h1>
          <p className="text-gray-400 text-sm">© 2025 MyWebsite. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/services" className="hover:text-blue-400 transition">Services</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition">🌐</a>
          <a href="#" className="hover:text-blue-400 transition">🐦</a>
          <a href="#" className="hover:text-blue-400 transition">📘</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
