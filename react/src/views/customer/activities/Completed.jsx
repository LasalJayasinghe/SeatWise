import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import Sidebar2 from '../../../components/sidebar2';
import restaurantImage from '../../../assets/restaurant3.jpg';
import { useStateContext } from '../../../context/ContextProvider.jsx';

export default function Completed() {
  const { user } = useStateContext();
  const userId = user ? user.id : null;

  const [completedReservations, setCompletedReservations] = useState([]);
  const [ratingSuccessMessage, setRatingSuccessMessage] = useState('');
  const [submittedRatings, setSubmittedRatings] = useState({});

  useEffect(() => {
    if (userId) {
      axiosClient.get('/get-completed-reservations').then((response) => {
        setCompletedReservations(response.data);
      });
    }
  }, [userId]);

  const handleRating = (restaurantID, rating) => {
    // Check if userId is available
    if (userId) {
      // Send a POST request to API to save the rating
      axiosClient
        .post('/rate-restaurant', { restaurantID, rating, userId })
        .then((response) => {
          setRatingSuccessMessage('Thanks for rating!');
          setSubmittedRatings({ ...submittedRatings, [restaurantID]: rating });

          setTimeout(() => {
            setRatingSuccessMessage('');
          }, 1000); 
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  return (
    <div>
      <div className="users-container">
        <Sidebar2 />
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {completedReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-md p-4">
                <img
                  src={restaurantImage}
                  alt="Restaurant Image"
                  className="object-cover w-full h-40 rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-green-500">
                  Reservation ID: {reservation.reservationNumber}
                </h2>
                <p className="text-gray-500">
                  Place: {reservation.restaurant?.restaurantname || 'Balaji Indian Cuisine'}
                </p>
                <p className="text-gray-500">
                  Date: {reservation.reservation_date}
                </p>
                <p className="text-gray-500">
                  Time: {reservation.start_time} - {reservation.end_time}
                </p>
                <p className="text-gray-500">
                  People: {reservation.number_of_participants}
                </p>
                <p className="text-gray-500">
      Price: {reservation.price}.00 LKR
    </p>

                <div>
                  {submittedRatings[reservation.restaurant_id] ? (
                    // Display submitted rating instead of rating buttons
                    <p className='mr-5  bg-green-200 rounded-full p-4 '>Your Rate{submittedRatings[reservation.restaurant_id]}</p>
                  ) : (
                    // Display rating buttons
                    <>
                      Rate the restaurant:
                      <button className='mr-5  bg-green-200 rounded-full p-4 ml-5' onClick={() => handleRating(reservation.restaurant_id, 1)}>1</button>
                      <button className='mr-5  bg-green-200 rounded-full p-4 '  onClick={() => handleRating(reservation.restaurant_id, 2)}>2</button>
                      <button className='mr-5  bg-green-200 rounded-full p-4 '  onClick={() => handleRating(reservation.restaurant_id, 3)}>3</button>
                      <button className='mr-5  bg-green-200 rounded-full p-4 '  onClick={() => handleRating(reservation.restaurant_id, 4)}>4</button>
                      <button className='mr-5  bg-green-200 rounded-full p-4 '  onClick={() => handleRating(reservation.restaurant_id, 5)}>5</button>
                    </>
                  )}
                </div>

                {ratingSuccessMessage && (
                  <div className="text-green-500">{ratingSuccessMessage}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
