import profilepic from '../../assets/defaultProfile.png';
import axiosClient from 'axios';
import React, { useState, useEffect } from 'react';

export default function Cards({ user }) {
  const [invitesData , setInviteData] = useState([]);
  console.log(user);
  
  useEffect(() => {
    // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
    axiosClient.get('userDetails/' + user.tablefortwo.acceptedID)
      .then((response) => {
        setInviteData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.tablefortwo.acceptedID]); // Specify the dependency here
  

    console.log("Data:" +invitesData);
    return (
    <div className="max-w-full px-4 py-4 flex items-center border-b border-gray-200">
      <img src={profilepic} className="h-12 w-12 object-cover object-center rounded-full mr-4" alt="Profile" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-700">{user.tablefortwo.acceptedID}</h3>
        <h3 className="text-sm text-gray-700">{user.reservation_date}</h3>
        <h3 className="text-sm text-gray-700">{user.restaurant_id}</h3>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <h3 className="text-gray-700">{user.hometown}</h3>
        </div>
      </div>

      {/* Buttons */}
      <div className="ml-4">
        <p className="font-bold text-green-500 mb-2">Approved</p>
        <button className="py-1 px-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 text-sm">Cancel</button>
      </div>
    </div>
  )
}
