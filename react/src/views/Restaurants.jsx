import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosClient.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement the search functionality here
    console.log('Search query:', searchQuery);
    // You can add the logic to perform the search based on the searchQuery value
  };

  return (
    <div className='bg-white'>
    <h1 className='text-4xl font-bold'>Restaurants</h1>

    <div className="mt-2">
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 opacity-40"
            fill="none"
            viewBox="0 02 32 32"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-64 h-12 py-1 pl-10 pr-4 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
          placeholder="Search restaurants"
        />
        <div className="mb-4 ml-3">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-12 pl-2 pr-4 text-gray-500 bg-transparent border-transparent rounded-md py-03 focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
          >
            <option>All Categories</option>
            <option value="">All categories</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
            <option value="Mexican Food">Mexican Food</option>
            <option value="Chinese Cuisine">Chinese Cuisine</option>
            <option value="Japanese Sushi">Japanese Sushi</option>
            <option value="Indian Cuisine">Indian Cuisine</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Seafood">Seafood</option>
            <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
            <option value="Steakhouse">Steakhouse</option>
            <option value="Bakery & Desserts">Bakery & Desserts</option>
          </select>
        </div>
        <button class="bg-black text-white font-semibold py-2 px-4 rounded mb-4 ml-4">
          Search
        </button>
      </div>
    </div>




      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          // Add a unique key prop to the mapped elements
          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
