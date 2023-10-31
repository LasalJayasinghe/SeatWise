import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import Sidebar2 from '../../../components/sidebar2';
import { useStateContext } from '../../../context/ContextProvider.jsx';
import restaurantImage from '../../../assets/restaurant3.jpg';


export default function Activities() {
  const { user } = useStateContext();
  const userId = user ? user.id : null;

  const [ongoingReservations, setOngoingReservations] = useState([]);

  useEffect(() => {
    if (userId) {
      axiosClient.get('/get-ongoing-reservations')
        .then((response) => {
          setOngoingReservations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching ongoing reservations:', error);
        });
    }
  }, [userId]);

  return (
    <div>
      <div className="users-container">
        <Sidebar2 />
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingReservations.map((reservation) => (
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
      Place: {reservation.restaurant?.name} {/* Use optional chaining (?.) */}
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
    {/* You can add more details here */}
    <button className="px-4 py-2 mb-2 font-semibold text-white bg-black rounded-md md:mb-4">
      Edit Reservation
    </button>
    <button className="px-4 py-2 font-semibold text-gray-600 bg-gray-200 rounded-md">
      Cancel Reservation
    </button>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
}
