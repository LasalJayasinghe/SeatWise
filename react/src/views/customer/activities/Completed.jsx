import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import Sidebar2 from '../../../components/sidebar2';
import restaurantImage from '../../../assets/restaurant3.jpg';

export default function Completed() {
  const [completedReservations, setCompletedReservations] = useState([]);

  useEffect(() => {
    axiosClient.get('/get-completed-reservations').then((response) => {
      setCompletedReservations(response.data);
    });
  }, []);

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
