import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true); // 🆕 loading state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadData = async () => {
    setLoading(true); // 🆕 start loading
    try {
      let response = await fetch(`${backendUrl}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false); // 🆕 stop loading
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
      alt: "Burger"
    },
    {
      src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
      alt: "Pizza"
    },
    {
      src: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
      alt: "Barbecue"
    }
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Carousel */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 z-20 w-2/3 md:w-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <input
            type="search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-900 bg-opacity-60 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search"
          />
        </div>

        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`absolute w-full h-full top-0 left-0 transition-opacity duration-700 ease-in-out brightness-50 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit: 'cover' }}
            loading="lazy" // 🆕 Lazy load carousel images
          />
        ))}

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          &#10095;
        </button>
      </div>

      {/* Food categories and cards */}
      <div className="container mx-auto px-4 py-6">
        {loading ? ( // 🆕 Show loading while fetching
          <div className="text-center text-xl font-semibold text-gray-600 animate-pulse">
            Loading food items...
          </div>
        ) : (
          foodCat && foodCat.length !== 0 &&
          foodCat.map((data) => (
            <div key={data._id} className="mb-8">
              <div className="text-3xl mb-2">{data.CategoryName}</div>
              <hr className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {foodItem && foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <Card
                        key={filterItems._id}
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    ))
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}