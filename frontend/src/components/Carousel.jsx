import React, { useState, useEffect, useRef } from "react";

const images = [
  {
    src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    alt: "Burger",
  },
  {
    src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    alt: "Pizza",
  },
  {
    src: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&h=700&w=900",
    alt: "Barbecue",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 5000; // 5 seconds per slide

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto select-none">
      {/* Search form overlay */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md bg-black bg-opacity-40 rounded-md p-3 flex gap-3 items-center">
        <form className="flex flex-grow" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="flex-grow px-3 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Slides */}
      <div className="relative h-64 sm:h-96 overflow-hidden rounded-md">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`
              absolute top-0 left-0 w-full h-full object-cover 
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
              brightness-[30%]
            `}
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}