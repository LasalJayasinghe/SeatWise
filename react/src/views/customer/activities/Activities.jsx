import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import Sidebar2 from '../../../components/sidebar2';
import { useStateContext } from '../../../context/ContextProvider.jsx';
import restaurantImage from '../../../assets/restaurant3.jpg';
import chocolatecake from '../../../assets/chocolatecake.jpeg'
import pizza from '../../../assets/Pizza-3007395.jpg'


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
          <div className="">
          {ongoingReservations.map((reservation) => (
  <div key={reservation.id} className="p-4 bg-white rounded-md">
      <div className="flex flex-col p-4 bg-white rounded-md md:p-6 md:flex-row">
      {/* Upper Left */}
      <div className="flex flex-col md:w-1/2 md:border-r md:pr-6">
        {/* Square Image */}
        <div className="mb-4 md:h-40">
          <img
            src={restaurantImage} 
            alt="Restaurant Image"
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        {/* Information */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <ul className="mb-4 md:mb-0">
            <li className="mb-2"><span className='text-xl font-bold text-green-500'>{reservation.reservationNumber} </span><span className='text-gray-400'>Reservation ID</span></li>
            <li className="mb-2"><span className='text-gray-500'>Place:</span>{reservation.restaurant?.restaurantname || 'Balaji Indian Cousine'}</li>
            <li className="mb-2"><span className='text-gray-500'>Date:</span> {reservation.reservation_date}</li>
            <li className="mb-2"><span className='text-gray-500'>Time:</span>{reservation.start_time} - {reservation.end_time}</li>
            <li ><span className='text-gray-500'>People:</span>{reservation.number_of_participants}</li>
            
           
          </ul>
        </div>
      </div>

      {/* Upper Right */}
      <div className="md:w-1/2 md:pl-6">
        <h3 className="mb-4 text-xl font-semibold">You have ordered:</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <img
              src={pizza}
              alt="Food Image"
              className="object-cover w-8 h-8 mr-2 rounded-md"
            />
            Sausage pizza
          </li>
          <li className="flex items-center">
            <img
              src={chocolatecake}
              alt="Food Image"
              className="object-cover w-8 h-8 mr-2 rounded-md"
            />
            Chocolate cake
          </li>
        </ul>
      </div>
    </div>
    {/* Lower Left */}
    <div className="md:flex md:mt-4 md:ml-4">
    <div className="w-full md:w-1/2">
  <table className="w-full border-collapse border-none">
    <tbody>
      <tr className="border-b border-none">
        <td className="p-2 text-gray-500 border-r border-none">Order Fee:</td>
        <td className="p-2 border-none">1552.00 LKR</td>
      </tr>
      <tr className="border-b border-none">
        <td className="p-2 text-gray-500 border-r border-none">Reservation Fee:</td>
        <td className="p-2 border-none">150.00 LKR</td>
      </tr>
      <tr>
        <td className="p-2 text-lg font-bold text-green-500 border-r border-none">Total:</td>
        <td className="p-2 text-lg font-bold text-green-500 border-none">{reservation.price}.00 LKR</td>
      </tr>
    </tbody>
  </table>
</div>

      {/* Lower Right */}
      <div className="mt-4 md:mt-0 md:ml-6 md:flex md:flex-col md:justify-center">
        <button className="px-4 py-2 mb-2 font-semibold text-white bg-black rounded-md md:mb-4">
          Edit Reservation
        </button>
        <button className="px-4 py-2 font-semibold text-gray-600 bg-gray-200 rounded-md">
          Cancel Reservation
        </button>
      </div>
    </div>


  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
}
