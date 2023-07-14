import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
<<<<<<< Updated upstream
import ImageSlideshow from '../components/ImageSlideshow';

=======
>>>>>>> Stashed changes

const RestaurantInfo = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
<<<<<<< Updated upstream
  const [toggleState, setToggleState] = useState('tables');
  
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const handleToggle = (value) => {
    setToggleState(value);
  };

  return (
    <div className="restaurant-info">
      {error ? (
        <p>{error}</p>
      ) : restaurant ? (
        <div>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          {restaurant.images && restaurant.images.length > 0 ? (
            <Slideshow images={restaurant.images} />
          ) : (
            <p>No images available.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
          )}

          <div className="description">
Description goes here
          </div>
          <div className="menu-button">
Menu button goes here
          </div>
          <div className="middle-section">
            <div className="description">
Toggle desciption goes here
            </div>
            <div className="toggle-buttons">
              <button
                onClick={() => handleToggle('tables')}
                className={toggleState === 'tables' ? 'active' : ''}
              >
                Tables
              </button>
              <button
                onClick={() => handleToggle('occasions')}
                className={toggleState === 'occasions' ? 'active' : ''}
              >
                Occasions
              </button>
            </div>
            <div className="content">
structure goes here
            </div>
          </div>
        </div>
      )}
=======
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {restaurant ? (
            <div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
              {/* Display other relevant restaurant information */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};
>>>>>>> Stashed changes

export default RestaurantInfo;
