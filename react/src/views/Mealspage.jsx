import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const MealsPage = () => {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);
  

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}/meals`);
        setMeals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu for Restaurant {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold">{meal.name}</h2>
            <p className="text-gray-600 mt-2">{meal.description}</p>
            <p className="text-gray-800 font-medium mt-2">Price: ${meal.price}</p>
            {/* You can add more fields here as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
