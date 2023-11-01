import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import mealimage from '../../../assets/meal.jpg';

const MealsPage = () => {
  const { id } = useParams();
  const [restaurantName, setRestaurantName] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchRestaurantAndMeals = async () => {
      try {
        // Fetch restaurant details
        const restaurantResponse = await axiosClient.get(`/restaurants/${id}`);
        setRestaurantName(restaurantResponse.data.restaurantname);

        // Fetch meals for the restaurant
        const mealsResponse = await axiosClient.get(`/restaurants/${id}/meals`);
        setMeals(mealsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantAndMeals();
  }, [id]);


  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Menu for {restaurantName}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <div key={meal.id} className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold">{meal.name}</h2>
            <img src= {mealimage} alt={meal.name} className="object-cover w-full h-40 mt-2 rounded-md" />
            <p className="mt-2 text-gray-600">{meal.description}</p>
            <p className="mt-2 font-medium text-gray-800">Price: LKR {meal.price}</p>
            {/* You can add more fields here as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
