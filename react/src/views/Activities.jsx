import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
// import avatarImage from '../assets/lauren.jpg'
export default function Activities() {
  return (
    <div className="flex">
      {/* Left Navbar */}
      <div className="w-50 bg-gray-100 h-screen top-16 rounded-2xl p-10 ">
        <nav>
          <ul className="space-y-2">
            {/* NavLink for Ongoing */}
            <li>
              <NavLink
                to="/activities/ongoing"
                activeClassName="text-green-500"
                className="hover:text-green-500"
              >
                Ongoing
              </NavLink>
            </li>
            
            {/* NavLink for Completed */}
            <li>
              <NavLink
                to="/activities/completed"
                activeClassName="text-green-500"
                className="hover:text-green-500"
              >
                Completed
              </NavLink>
            </li>
            
            {/* NavLink for Complaints */}
            <li>
              <NavLink
                to="/activities/complaints"
                activeClassName="text-green-500"
                className="hover:text-green-500"
              >
                Complaints
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Right Content */}
      <div className="flex-1 mx-10">
      <h1 className=' text-2xl font-bold'>Complaints</h1>
      <p className='text-gray-500'>Description goed here</p>
      <div className=" my-5 flex items-center space-x-2">
        <button className="w-10 h-10  text-gray-500 hover:text-white bg-gray-200 rounded-lg flex items-center justify-center hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400">
            <span className="text-3xl">+</span>
        </button>
        <span className="text-gray-700 font-bold">Add complaint</span>
        </div>
        <div>
            

        <div
        class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <h5
            class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
            Unsatisfactory Table Reservation
        </h5>
        <p class="mb-4 text-base text-neutral-600 ">
        I am disappointed with the table booking system. Despite confirming my reservation, 
        my table was not available upon arrival, causing inconvenience. 
        Improve reliability and communication.
        </p>
        {/* <img
            className="w-full h-full object-cover"
            src={avatarImage}
            alt="Avatar"
        /> */}
        <p className='font-bold text-blue-500'>Working on it</p>
        </div>




        <div
        class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <h5
            class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
            Unsatisfactory Table Reservation
        </h5>
        <p class="mb-4 text-base text-neutral-600 ">
        I am disappointed with the table booking system. Despite confirming my reservation, 
        my table was not available upon arrival, causing inconvenience. 
        Improve reliability and communication.
        </p>
        {/* <img
            className="w-full h-full object-cover"
            src={avatarImage}
            alt="Avatar"
        /> */}
        <p className='font-bold text-green-500'>Resolved</p>
        </div>



        <div
        class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <h5
            class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
            Unsatisfactory Table Reservation
        </h5>
        <p class="mb-4 text-base text-neutral-600 ">
        I am disappointed with the table booking system. Despite confirming my reservation, 
        my table was not available upon arrival, causing inconvenience. 
        Improve reliability and communication.
        </p>
        {/* <img
            className="w-full h-full object-cover"
            src={avatarImage}
            alt="Avatar"
        /> */}
        <p className='font-bold text-yellow-500'>Pending...</p>
        </div>



        </div>


      </div>
    </div>
  );
}
