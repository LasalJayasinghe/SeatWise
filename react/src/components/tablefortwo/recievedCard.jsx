import profilepic from '../../assets/defaultProfile.png';
import axiosClient from "../../axios-client.js";
import React, { useState, useEffect } from 'react';

export default function Cards({ user }) {
  const [invitesData, setInviteData] = useState([]);
  const [resData, setResData] = useState([]);
  
  console.log("user", user);
  
  useEffect(() => {
    if (user.reservation?.reservant_ID && user.reservation) {
      const getUserDetails = axiosClient.get('userDetails/' + user.reservation.reservant_ID);
      const getRestaurantDetails = axiosClient.get('restaurantDetails/' + user.reservation.restaurant_id);
  
      Promise.all([getUserDetails, getRestaurantDetails])
        .then((responses) => {
          const [userData, restaurantData] = responses;
          console.log("user data", userData.data);
          console.log("restaurant data", restaurantData.data);
  
          setInviteData(userData.data);
          setResData(restaurantData.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user.reservation?.reservant_ID, user.reservation?.restaurant_id]);
  

  // Convert time 
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';
  
    // Convert hours to a number
    const hoursNum = parseInt(hours, 10);
  
    // Check if it's PM
    if (hoursNum >= 12) {
      period = 'PM';
    }
  
    // Convert hours to 12-hour format
    const formattedHours = hoursNum % 12 || 12;
  
    return `${formattedHours}:${minutes} ${period}`;
  };

    return (
    <div className="max-w-full px-4 py-4 flex items-center border-b border-gray-200">
      <img src={profilepic} className="h-12 w-12 object-cover object-center rounded-full mr-4" alt="Profile" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-700">{invitesData.firstname} {invitesData.lastname}</h3>
        <h3 className="text-sm text-gray-700">{user.reservation.reservation_date}</h3> 
        <h3 className="text-sm text-gray-700">  {formatTime(user.reservation.start_time)} - {formatTime(user.reservation.end_time)}</h3>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <h3 className="text-sm text-gray-700">{resData.restaurantname}</h3>
        </div>
      </div>

      {/* Buttons */}
      <div className="ml-4">
      <p className={`font-bold text-${user.status === 'completed' ? 'green-500' : 'red-500'} mb-2`}>
              {user.status === 'completed' ? 'Completed' : 'Canceled'}
     </p>   
     </div>
    </div>
  )
}
