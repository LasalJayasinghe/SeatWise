



import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import respic from '../assets/restaurant1.jpg'
import pizza from '../assets/Pizza-3007395.jpg'
import chocolatecake from '../assets/chocolatecake.jpeg'

// import avatarImage from '../assets/lauren.jpg'
export default function Activities() {
  return (
    <div className="flex">
      {/* Left Navbar */}
      <div className="h-screen p-10 bg-gray-100 w-50 top-16 rounded-2xl ">
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




        


      </div>
    </div>
  );
}
