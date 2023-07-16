import React, { useEffect, useState } from 'react';
import { useParams , Link  } from 'react-router-dom';
import axiosClient from '../axios-client';
import Slideshow from '../components/ImageSlideshow'; // Assuming you have the correct import for the Slideshow component

const RestaurantInfo = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [toggleState, setToggleState] = useState('tables');
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred.');
      }
    };

    fetchRestaurantData();
  }, [id]);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}/occasions`);
        setOccasions(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred.');
      }
    };

    fetchOccasions();
  }, [id]);

  const handleToggle = (value) => {
    setToggleState(value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="restaurant-info">
      <div className="info-section bg-gray-100 p-4 mb-4">
        <h2>{restaurant.name}</h2>
        <p>{restaurant.description}</p>
        {restaurant.images && restaurant.images.length > 0 ? (
          <Slideshow images={restaurant.images} />
        ) : (
          <p>No images available.</p>
        )}
      </div>

      <div className="description bg-gray-200 p-2 mb-2">
        Description goes here
      </div>
      <div className="menu-button bg-gray-300 p-2 mb-2">
        Menu button goes here
      </div>
      <div className="middle-section mb-4">
        <div className="description bg-gray-200 p-2 mb-2">
          Toggle description goes here
        </div>
        <div className="toggle-buttons flex justify-center mb-2">
          <button
            onClick={() => handleToggle('tables')}
            className={`p-2 ${
              toggleState === 'tables' ? 'bg-blue-500 text-white' : 'bg-gray-400'
            }`}
          >
            Tables
          </button>
          <button
            onClick={() => handleToggle('occasions')}
            className={`p-2 ${
              toggleState === 'occasions' ? 'bg-blue-500 text-white' : 'bg-gray-400'
            }`}
          >
            Occasions
          </button>
        </div>
        <div className="content bg-gray-300 p-4">
          {/* Check if toggleState is 'tables', then display table information */}
          {toggleState === 'tables' && (
            <div>
              {/* Display the table information */}
            </div>
          )}

          {/* Check if toggleState is 'occasions', then display occasions */}
          {toggleState === 'occasions' && (
          <div>
            {occasions.map((occasion) => (
              // Wrap each occasion in a Link component
              <Link to={`/restaurants/${restaurant.id}/occasions/${occasion.id}`} key={occasion.id}>
                <div>
                  <h3>{occasion.name}</h3>
                  <p>{occasion.description}</p>
                </div>
              </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
