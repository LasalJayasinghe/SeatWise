import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import StarRatings from 'react-rating-stars-component';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.get(`/restaurants/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const displayRestaurants = searchResults.length > 0 ? searchResults : restaurants;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosClient.get('/restaurantss');
        setRestaurants(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
  }, []);

  function getOpenDays(profile) {
    const days = [];
    if (profile && profile.monday === 1) days.push('Monday');
    if (profile && profile.tuesday === 1) days.push('Tuesday');
    if (profile && profile.wednesday === 1) days.push('Wednesday');
    if (profile && profile.thursday === 1) days.push('Thursday');
    if (profile && profile.friday === 1) days.push('Friday');
    if (profile && profile.saturday === 1) days.push('Saturday');
    if (profile && profile.sunday === 1) days.push('Sunday');

    return days.join(', ');
  }

  return (
    <div className='bg-white'>
      <div className="mx-10">
        <h1 className='mb-5 text-4xl font-bold'>Restaurants</h1>
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
              value={searchQuery}
              onChange={handleSearchInputChange}
              name="price"
              id="price"
              className="block w-full h-12 py-1 pl-10 pr-4 mt-3 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md sm:w-64 focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
              placeholder="Search restaurants"
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
              <option value="">All categories</option>
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white bg-black rounded sm:ml-4"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <h4 className='mx-10 mt-10 text-lg text-gray-500'>Restaurants you may like</h4>
      </div>
     

      <div className="grid grid-cols-1 gap-4 mt-6 mr-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayRestaurants.map((restaurant) => (
          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            
            <div className="restaurant-card ">
              <div className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
              <img
                    className="object-cover"
                    src={restaurant.profile && restaurant.profile.cover ? restaurant.profile.cover : 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'}
                    alt="product image"
                    onError={(e) => {
                      console.error('Image load error:', e.target.src);
                      e.target.src = 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'; // Set a fallback image URL
                    }}
                  />
                <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl">New</span>
                <div className="px-5 pb-5 mt-4">
                  <h5 className="text-xl font-bold tracking-tight text-slate-900">{restaurant.restaurantname}</h5>
                  {/* Display opening dates and time */}
                  <div className="mt-2">
                    <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                    <p className="text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <p>
                      <span className="text-sm text-slate-700">{restaurant.resType}</span>
                    </p>
                    <div className="flex items-center">
                      {restaurant.avgRate ? (
                        <StarRatings
                          rating={restaurant.avgRate}
                          count={restaurant.avgRate}
                          size={24}
                          edit={false}
                          isHalf={true}
                          color="#FFD700"
                        />
                      ) : (
                        <p>No ratings yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
