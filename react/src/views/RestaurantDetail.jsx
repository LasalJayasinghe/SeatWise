import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [halls, setHalls] = useState([]); // State to hold halls data
  const [toggle, setToggle] = useState('tables'); // 'tables' is the default value

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}/halls`);
        setHalls(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (toggle === 'halls') {
      fetchHalls();
    }
  }, [id, toggle]);

  const handleToggle = () => {
    setToggle(toggle === 'tables' ? 'halls' : 'tables');
  };

  // If the data is not yet fetched, display a loading message or spinner
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="text-gray-600 mb-6">{restaurant.description}</p>
      <div className="flex items-center justify-center mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${
            toggle === 'tables'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Tables
        </button>
        <button
          className={`py-2 px-4 rounded-lg ml-4 ${
            toggle === 'halls'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Halls
        </button>
      </div>

      {/* Display other relevant restaurant details here */}
      {toggle === 'halls' && (
        <div>
          {halls.map((hall) => (
            <div key={hall.id} className="mb-4">
              <Link to={`/halls/${hall.id}`}>
                <h3 className="text-lg font-semibold">{hall.name}</h3>
              </Link>
              <p className="text-gray-600">{hall.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
