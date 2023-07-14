import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

const Dashboard = () => {
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
      <h2>Dashboard</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
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

export default Dashboard;
