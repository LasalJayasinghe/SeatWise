import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosClient from '../../axios-client';
import StarRatings from 'react-rating-stars-component';

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';
import slide4 from '../../assets/slide4.png';

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

      if (selectedArea === '') {
        // If "All areas" is selected, retrieve all restaurants
        response = await axiosClient.get('/restaurantss');
      } else {
        // Otherwise, retrieve restaurants by selected area
        response = await axiosClient.get(`/restaurantss?area=${selectedArea}`);
      }

      const filteredRestaurants = response.data.filter((restaurant) =>
        restaurant.restaurantname.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRestaurants); // Store search results
    } catch (error) {
      console.error(error);
    }
  };

  const displayRestaurants = searchResults.length > 0 ? searchResults : restaurants;

  return (
    <div>
      <div className="bg-white">
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
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by restaurant name"
              className="w-64 mr-5 p-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ fontSize: '12px' }}
            />
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
          {/* Display search results */}
          {displayRestaurants.slice(0, 6).map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <img
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-xl bg-red-700 px-2 text-center text-sm font-medium text-white">New</span>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl tracking-tight text-slate-900 font-bold">{restaurant.restaurantname}</h5>
                    {/* Display opening dates and time */}
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
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

        {/* Restaurants you may like */}
        <h2 className="mt-8 text-2xl font-semibold">Restaurants you may like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants.slice(0, 6).map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <img
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-xl bg-red-700 px-2 text-center text-sm font-medium text-white">New</span>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl tracking-tight text-slate-900 font-bold">{restaurant.restaurantname}</h5>
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
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

        {/* Popular Restaurants */}
        <h2 className="mt-8 text-2xl font-semibold">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants.slice(0, 6).map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <img
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-xl bg-red-700 px-2 text-center text-sm font-medium text-white">New</span>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl tracking-tight text-slate-900 font-bold">{restaurant.restaurantname}</h5>
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
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
    </div>
  );
}
