import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import mealimage from '../../assets/meal.jpg';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const allMealsResponse = await axiosClient.get('/all-meals');
        setMeals(allMealsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeals();
  }, []);

  const handleSearch = () => {
    const newFilteredMeals = meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(newFilteredMeals);
  };
  

  const handleClear = () => {
    setSearchTerm('');
    setFilteredMeals([]);
  };

  return (
    <div>
      <div className="mx-10">
        <h1 className='mb-5 text-4xl font-bold'>Meals</h1>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="relative flex items-center mb-4 sm:mb-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 opacity-40"
                fill="none"
                viewBox="0 3 32 1"
                stroke="currentColor"
                style={{ top: "50%", transform: "translateY(-50%)" }}
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
              className="block w-full h-12 py-1 pl-10 pr-4 mt-3 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md sm:w-64 focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
              placeholder="Search meals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:ml-3">
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
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Soups">Soups</option>
          <option value="Salads">Salads</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
          <option value="Brunch">Brunch</option>
          <option value="Picnic Foods">Picnic Foods</option>
          <option value="Party Foods">Party Foods</option>
          <option value="Comfort Foods">Comfort Foods</option>
          <option value="Grilled Foods">Grilled Foods</option>
          <option value="Baked Goods">Baked Goods</option>
          <option value="Barbecue Dishes">Barbecue Dishes</option>
          <option value="Sandwiches">Sandwiches</option>
          <option value="Pasta Dishes">Pasta Dishes</option>
          <option value="Rice Dishes">Rice Dishes</option>
          <option value="Stir-fries">Stir-fries</option>
          <option value="Sushi Rolls">Sushi Rolls</option>
          <option value="Curry Dishes">Curry Dishes</option>
          <option value="Seafood Specialties">Seafood Specialties</option>
          <option value="Vegetarian/Vegan Meals">Vegetarian/Vegan Meals</option>
          <option value="Meat-based Dishes">Meat-based Dishes</option>
          <option value="Finger Foods">Finger Foods</option>
          <option value="International Cuisine">International Cuisine</option>
          <option value="Street Food">Street Food</option>
          <option value="Family-style Meals">Family-style Meals</option>

        </select>
      </div>
          <button
            className="px-4 py-2 font-semibold text-white bg-black rounded sm:ml-4"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-4 py-2 font-semibold text-white bg-gray-400 rounded sm:ml-4"
            onClick={handleClear}
          >
            Refresh
          </button>
        </div>
      </div>
      {/* Display the list of meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {(filteredMeals.length > 0 ? filteredMeals : meals).map((meal) => (
    <div key={meal.id} className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-semibold">{meal.name}</h2>
      <img src={mealimage} alt={meal.name} className="w-full h-40 object-cover mt-2 rounded-md" />
      <p className="text-gray-600 mt-2">{meal.description}</p>
      <p className="text-gray-800 font-medium mt-2">Price: LKR {meal.price}</p>
      {/* You can add more fields here as needed */}
    </div>
  ))}
</div>

    </div>
  );
}
