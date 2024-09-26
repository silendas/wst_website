import React, { useState, useEffect } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_CkhEMPXXvNsdrU9q1Gqyr6S1jz2oPekX1TMkTLjd8MXRu87xbLgLEvyPhzgMbXFSR7NnMlxRq9EODf8iXxzKu_1wVQXCWivY_0ajeIDDL_eJN_1drmA4g9LzK8g0bFznWH9kTtKrUxkBDqRUIodIxIWuU66sttROqI19YHTC7fgLYJVNsEopGW5y/s680/UNBIN.jpg',
    'https://th.bing.com/th/id/OIP.w6TbSBr6kWNOURYOUb-vgQHaE8?rs=1&pid=ImgDetMain',
    'https://www.unbin.ac.id/public/assets/kcfinder/upload/files/acara/SeminarAPI/i1_20_11zon.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika pengiriman formulir di sini
    console.log('Data formulir:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section 1: Carousel */}
      <section className="mb-12">
        <div className="relative h-96 overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentSlide ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Tentang Perusahaan */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tentang Perusahaan</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
        </p>
      </section>

      {/* Section 3: Form Kontak */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block mb-1">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="pesan" className="block mb-1">Pesan</label>
            <textarea
              id="pesan"
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Kirim
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;