import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';

import Sidebar2 from '../../../components/sidebar2'
import respic from '../../../assets/restaurant1.jpg'
import chocolatecake from '../../../assets/chocolatecake.jpeg'
import pizza from '../../../assets/Pizza-3007395.jpg'
import restaurantImage from '../../../assets/restaurant3.jpg';



export default function Completed() {
  const [completedReservations, setCompletedReservations] = useState([]);

  useEffect(() => {
    axiosClient.get('/completed-reservations').then((response) => {
      setCompletedReservations(response.data);
    });
  }, []);    return (
        <div>
              <div className="users-container">
                <Sidebar2 />
                <div className="content-container">
    
    
    
    
    
          


      <div className="flex flex-col p-4 bg-white rounded-md md:p-6 md:flex-row">
      {/* Upper Left */}
      <div className="flex flex-col md:w-1/2 md:border-r md:pr-6">
        {/* Square Image */}
        <div className="mb-4 md:h-40">
          <img
            src={respic}
            alt="Card Image"
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        {/* Information */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <ul className="mb-4 md:mb-0">
            <li className="mb-2"><span className='text-xl font-bold text-green-500'>#234876 </span><span className='text-gray-400'>Reservation ID</span></li>
            <li className="mb-2"><span className='text-gray-500'>Place:</span> Salt and Wind</li>
            <li className="mb-2"><span className='text-gray-500'>Date:</span> August 15, 2023</li>
            <li className="mb-2"><span className='text-gray-500'>Time:</span> 12:00 PM - 14:00 PM</li>
            <li ><span className='text-gray-500'>People:</span> 4</li>
            
           
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
        <td className="p-2 text-lg font-bold text-green-500 border-none">1702.00 LKR</td>
      </tr>
    </tbody>
  </table>
</div>

      {/* Lower Right */}
      <div className="mt-4 md:mt-0 md:ml-6 md:flex md:flex-col md:justify-center">
        <p className='font-medium text-md'>Rate restaurant</p>
        <div className="flex items-center">
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        
      </div>
      </div>
    </div>





    
    
    
    
    
    
    
    
    
    
    
    
                </div>
              </div>
            </div>
      )
}
