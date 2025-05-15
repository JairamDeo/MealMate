import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="flex flex-wrap justify-between items-center py-3 my-4 border-t border-gray-300">
        <div className="w-full md:w-auto flex items-center justify-center md:justify-start mb-2 md:mb-0">
          <Link to="/" className="mr-2 text-gray-500 hover:text-gray-700 transition duration-200">
            {/* Placeholder for logo or icon if needed */}
          </Link>
          <span className="text-gray-500 text-sm">© 2024 MealMate, Inc</span>
        </div>

        <ul className="flex justify-center md:justify-end w-full md:w-auto list-none space-x-4">
          {/* Add footer links or icons here in the future */}
        </ul>
      </footer>
    </div>
  );
}
