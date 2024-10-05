import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;