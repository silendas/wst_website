import React from 'react';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">WST App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:text-gray-300">Beranda</a></li>
            <li><a href="#about" className="hover:text-gray-300">Tentang</a></li>
            <li><a href="#contact" className="hover:text-gray-300">Kontak</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow mt-16 mb-16">
        <Home />
      </main>
      <footer className="bg-gray-200 p-4 fixed bottom-0 left-0 right-0">
        <p className="text-center">&copy; 2023 WST. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}

export default App;