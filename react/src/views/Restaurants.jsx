import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';



const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  return (
    <div>
      <h1>Restaurants</h1
      >
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
