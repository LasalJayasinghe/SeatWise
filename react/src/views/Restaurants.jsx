import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import Cards from '../components/Cards';

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
      <button className="px-4 py-2 font-semibold text-white bg-black rounded sm:ml-4">
        Search
      </button>
    </div>
    </div>


    <div>
      <h4 className='mx-10 mt-10 text-lg text-gray-500'>Restaurants you may like</h4>


    </div>


      <div className="flex flex-wrap mx-10 mt-5 -m-4 restaurant-cards">
        {restaurants.map((restaurant) => (
          // Add a unique key prop to the mapped elements
          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="restaurant-card">
              {/* <h3>{restaurant.name}</h3>
              <p>{restaurant.resType}</p>
              <p>{restaurant.starRate}</p><br /> */}


              <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
  <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
    <img class="object-cover" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="product image" />
    <span class="absolute top-0 left-0 m-2 rounded-xl bg-red-700 px-2 text-center text-sm font-medium text-white">New</span>
  </a>
  <div className="mt-4 px-5 pb-5">
    <a href="#">
      <h5 class="text-xl tracking-tight text-slate-900 font-bold">{restaurant.restaurantname}</h5>
    </a>
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span class="text-sm  text-slate-700">{restaurant.resType}</span>
        {/* <span class="text-3xl font-bold text-slate-900">$449</span>
        <span class="text-sm text-slate-900 line-through">$699</span> */}
      </p>
      <div className="flex items-center">
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{restaurant.starRate}</span>
      </div>
    </div>
    {/* <a href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart</a> */}
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
