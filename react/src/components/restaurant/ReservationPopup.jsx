import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import ConfirmationPopup from './ConfirmationPopup'; // Import the new component

const ReservationPopup = ({ onClose , selectedTables}) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // Add state
  
    const handleContinueClick = () => {
        setShowConfirmation(true); // Show the confirmation popup
      };
      
  
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
      <span className="popup-close" onClick={onClose}>
          &#10005; {/* Use the 'times' character for the cross */}
        </span>
        <h2 className="text-xl font-bold mb-4">Your Tables Reserved!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for reserving your tables with us.
        </p>
        <div className="flex gap-4">
        <button
          className="border border-green-500 text-green-500 px-4 py-2 rounded-lg"
          onClick={() => {
            // Perform action for "Order Meal"
          }}
        >
          Order Meal
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleContinueClick} // Show the confirmation popup on "Continue" click
        >
          Continue
        </button>

        {/* Show the ConfirmationPopup when showConfirmation is true */}
        {showConfirmation && (
          <ConfirmationPopup
            onClose={() => setShowConfirmation(false)}
            // userName={user.name}
            selectedTables={selectedTables}
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default ReservationPopup;