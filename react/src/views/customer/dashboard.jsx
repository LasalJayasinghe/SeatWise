import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosClient from '../../axios-client';
import restaurantimage from '../../assets/restaurant3.jpg';
import restaurantimage2 from '../../assets/restaurant1.jpg';

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';
import slide4 from '../../assets/slide4.png';

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosClient.get('/restaurantss');
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
  
      if (selectedArea === "") {
        // If "All areas" is selected, retrieve all restaurants
        response = await axiosClient.get('/restaurantss');
      } else {
        // Otherwise, retrieve restaurants by selected area
        response = await axiosClient.get(`/restaurantss?area=${selectedArea}`);
      }
  
      setSearchResults(response.data); // Store search results
    } catch (error) {
      console.error(error);
    }
  };
  
  const displayRestaurants = searchResults.length > 0 ? searchResults : restaurants;

  return (
    <div>
      <div className='bg-white'>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
            <img className="object-contain h-128" src={slide1} alt="Image 1" />
          </div>
          <div>
            <img src={slide2} alt="Image 2" />
          </div>
          <div>
            <img src={slide3} alt="Image 3" />
          </div>
          <div>
            <img src={slide4} alt="Image 4" />
          </div>
        </Carousel>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-8" style={{ fontSize: '12px' }}>
        <label className="flex items-center">
        <p className="ml-8 text-sm font-semibold">Select Area : </p>
              {/* <b>Select Area : </b> */}
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-32 mr-5 p-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                style={{ fontSize: '12px' }}
              >
                <option value="" disabled>Select area</option>
                <option value="">All areas</option>
                <option value="Kottawa">Kottawa</option>
                <option value="Maharagama">Maharagama</option>
                <option value="Nugegoda">Nugegoda</option>
              </select>
            </label>
            <button type="submit" className="mr-4 bg-green-500 text-white py-2 px-4 rounded-lg">
              Search
            </button>

        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8 text-2xl font-semibold">Search Results</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Display restaurants based on displayRestaurants */}
          {displayRestaurants.slice(0, 3).map((restaurant) => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="bg-white p-4 shadow-md rounded-md">
                <h3 className="text-xl font-semibold">{restaurant.restaurantname}</h3>
                <p className="mt-2 text-sm">{restaurant.description}</p>
                <div className="mt-2 text-gray-500" style={{ fontSize: '12px' }}>
                  <strong>Opening Days : </strong> 
                  {restaurant.monday ? 'Mon ' : ''}
                  {restaurant.tuesday ? 'Tue ' : ''}
                  {restaurant.wednesday ? 'Wed ' : ''}
                  {restaurant.thursday ? 'Thu ' : ''}
                  {restaurant.friday ? 'Fri ' : ''}
                  {restaurant.saturday ? 'Sat ' : ''}
                  {restaurant.sunday ? 'Sun ' : ''}
                </div>
                <img src={restaurantimage} alt={restaurant.restaurantname} className="w-full h-40 object-cover mt-2 rounded-md" />
              </div>
            </Link>
          ))}
        </div>

        {/* Restaurants you may like */}
        <h2 className="mt-8 text-2xl font-semibold">Restaurants you may like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants.slice(0, 3).map((restaurant) => (
                        <Link to={`/restaurantss/${restaurant.id}`} key={restaurant.id}>
                        <div className="bg-white p-4 shadow-md rounded-md">
                          <h3 className="text-xl font-semibold">{restaurant.restaurantname}</h3>
                          <p className="mt-2 text-sm">{restaurant.description}</p>
                          <div className="mt-2 text-gray-500" style={{ fontSize: '12px' }}>
                            <strong>Opening Days : </strong> 
                            {restaurant.monday ? 'Mon ' : ''}
                            {restaurant.tuesday ? 'Tue ' : ''}
                            {restaurant.wednesday ? 'Wed ' : ''}
                            {restaurant.thursday ? 'Thu ' : ''}
                            {restaurant.friday ? 'Fri ' : ''}
                            {restaurant.saturday ? 'Sat ' : ''}
                            {restaurant.sunday ? 'Sun ' : ''}
                          </div>
                          <img src={restaurantimage2} alt={restaurant.restaurantname} className="w-full h-40 object-cover mt-2 rounded-md" />
                        </div>
                      </Link>
          ))}
        </div>

        {/* Popular Restaurants */}
        <h2 className="mt-8 text-2xl font-semibold">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants.slice(0, 3).map((restaurant) => (
                        <Link to={`/restaurantss/${restaurant.id}`} key={restaurant.id}>
                        <div className="bg-white p-4 shadow-md rounded-md">
                          <h3 className="text-xl font-semibold">{restaurant.restaurantname}</h3>
                          <p className="mt-2 text-sm">{restaurant.description}</p>
                          <div className="mt-2 text-gray-500" style={{ fontSize: '12px' }}>
                            <strong>Opening Days : </strong> 
                            {restaurant.monday ? 'Mon ' : ''}
                            {restaurant.tuesday ? 'Tue ' : ''}
                            {restaurant.wednesday ? 'Wed ' : ''}
                            {restaurant.thursday ? 'Thu ' : ''}
                            {restaurant.friday ? 'Fri ' : ''}
                            {restaurant.saturday ? 'Sat ' : ''}
                            {restaurant.sunday ? 'Sun ' : ''}
                          </div>
                          <img src={restaurantimage} alt={restaurant.name} className="w-full h-40 object-cover mt-2 rounded-md" />
                        </div>
                      </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
