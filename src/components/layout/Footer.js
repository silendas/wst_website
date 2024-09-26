/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Alamat</h3>
            <p>Jl. Soekarno Hatta No. 123</p>
            <p>Jakarta Selatan, 12345</p>
            <p>Indonesia</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <p>Telepon: +62 21 1234 5678</p>
            <p>Email: info@wstapp.com</p>
            <p>WhatsApp: +62 812 3456 7890</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">Facebook</a>
              <a href="#" className="hover:text-gray-400">Twitter</a>
              <a href="#" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8">
        <p className="text-center">&copy; 2023 WST App. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;
