import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import ConfirmationPopup from './ConfirmationPopup'; // Import the new component

const ReservationPopup = ({ onClose, selectedTables }) => {
  const { id } = useParams(); // Get the restaurantId from the URL

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinueClick = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <span className="popup-close" onClick={onClose}>
          &#10005;
        </span>
        <h2 className="text-xl font-bold mb-4">Your Tables Reserved!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for reserving your tables with us.
        </p>
        <div className="flex gap-4">
          <Link
            to={`/restaurants/${id}/meals`} // Use the available restaurantId from the URL
            className="border border-green-500 text-green-500 px-4 py-2 rounded-lg"
          >
            Order Meal
          </Link>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleContinueClick}
          >
            Continue
          </button>

          {showConfirmation && (
            <ConfirmationPopup
              onClose={() => setShowConfirmation(false)}
              selectedTables={selectedTables}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;
